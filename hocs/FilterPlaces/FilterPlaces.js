
import { useState, useEffect, useRef } from 'react';
import { Icon } from "components/atoms";
import { faChevronRight, faChevronLeft, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import "components/molecules/Filter/Filter.module.scss";
import { fetchPlace, fetchGeolocationsById } from '../../services/places';
import useDebounce from '../../utils/hooks/useDebounce';

const FilterPlaces = props => {
    const [nearBy, setNearBy] = useState(false);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingPlaces, setLoadingPlaces] = useState(false);

    const [places, setPlaces] = useState([]);
    const searchRef = useRef(null);
    const nearById = 'nearBy';
    const { geoLocation } = props;
    const debouncedSearchTerm = useDebounce(searchValue, 500);

    useEffect(() => {
        if (geoLocation && !geoLocation.loading && geoLocation.latitude && geoLocation.longitude) {
            props.handleChange({
                lat: geoLocation.latitude,
                long: geoLocation.longitude,
            })
            setNearBy(true);
            setSelected(nearById);
        } else {
            setNearBy(false);
        }
    }, [geoLocation])

    useEffect(() => {
        if (open) searchRef.current.focus()
    }, [open]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setLoading(true);
            fetchPlaces(debouncedSearchTerm.toLowerCase())
        }
    }, [debouncedSearchTerm]);

    async function fetchPlaces(search) {
        const placesResult = await fetchPlace(search);
        if (placesResult && placesResult.results && placesResult.results.length > 0) {
            setPlaces(placesResult.results.map(place => ({
                id: place.id,
                name: place.name,
                secondaryName: place.secondary,
            })));
            setLoading(false);
        }
    }

    async function handleSelect(value) {
        setLoadingPlaces(true);
        if (value === '') {
            setLoadingPlaces(false);
            return false;
        }

        if (value === nearById) {
            props.handleChange({
                lat: geoLocation.latitude,
                long: geoLocation.longitude,
            });
            return setLoadingPlaces(false);
        }

        const newGeolocations = await fetchGeolocationsById([value]);
        if (newGeolocations && newGeolocations.length > 0) {
            props.handleChange({
                lat: newGeolocations[0].geolocation.lat,
                long: newGeolocations[0].geolocation.long,
            })
            return setLoadingPlaces(false);
        }
    }

    let items = [...places];
    if (nearBy && (!searchValue || searchValue.length === 0)) {
        items = [
            {
                id: nearById,
                name: 'Perto de mim',
            },
            ...items,
        ]
    }

    const selectedItem = items.find(item => item.id === selected);

    return (
        <div className="filter">
            {!open
                ? (
                    <button
                        className={`filter__button ${selectedItem ? "filter__button--active" : ""}`}
                        onClick={() => setOpen(!open)}
                    >
                        <div className="filter__button__label">
                            <p title='title'>Localização</p>
                            <p title='desc'>{selectedItem ? selectedItem.name : 'todos os locais'}</p>
                        </div>

                        <span className="filter__arrow">
                            <Icon icon={loadingPlaces ? faCircleNotch : faChevronRight} spin={loadingPlaces} />
                        </span>
                    </button>
                )
                : (
                    <div className="filter__list">
                        <div className="filter__list__head" onClick={() => setOpen(false)}>
                            <Icon icon={loadingPlaces ? faCircleNotch : faChevronLeft} spin={loadingPlaces} />
                            <span>Localização</span>
                        </div>


                        <input
                            value={searchValue}
                            ref={searchRef}
                            className="filter__list__item"
                            type="text"
                            placeholder='Pesquisar locais'
                            onChange={(e) => setSearchValue(e.target.value)}
                        />


                        <div className="filter__list__scrollable">
                            {loading && (
                                <div
                                    className='filter__list__item filter__list__item__loading'
                                >
                                    <label>A carregar resultados...</label>
                                </div>
                            )}
                            {items.map(item => (
                                <div
                                    key={item.id}
                                    className={`filter__list__item ${
                                        item.id === selected ? "filter__list__item--selected" : ""
                                        }`}
                                    onClick={() => {
                                        setSelected(item.id)
                                        setOpen(false);
                                        handleSelect(item.id)
                                    }}
                                >
                                    <input type="radio" checked={item.id === selected} id={`radio${item.id}`} />
                                    <label htmlFor={`radio${item.id}`}>{item.name} {item.secondaryName ? ` - ${item.secondaryName}` : ''}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
        </div>
    );
}

export default FilterPlaces;