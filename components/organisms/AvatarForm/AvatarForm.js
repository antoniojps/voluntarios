import React, { useEffect, useState, useRef } from 'react'
import './AvatarForm.module.scss'
import { Avatar, ButtonAction, Range } from 'components/atoms'
import { useSetState } from 'react-use'
import {
  Types,
  HairOptions,
  FacialHairOptions,
  FaceOptions,
  AccessoriesOptions,
  getIndexByValueAndType,
  defaultAvatar,
} from './../../atoms/Avatar/utils'
import { Spacer, Checkbox, Note } from '@zeit-ui/react'
import { faSave, faUpload } from '@fortawesome/free-solid-svg-icons'
import Confetti from 'react-dom-confetti';
import { confettiConfig } from '../../../services/contants'
import Link from 'next/link'
import Resizer from 'react-image-file-resizer';

const AvatarForm = ({
  initialImage = {
    small: null,
    medium: null,
    large: null,
  },
  initialIllustration = {
    accessory: null,
    face: null,
    hair: null,
    facialHair: null,
  },
  onSubmit = () => { },
  loading = false,
  successToggle = false,
}) => {
  const [illustration, setIllustration] = useSetState(initialIllustration)
  const [hairIndex, setHairIndex] = useState(
    getIndexByValueAndType(
      Types.Hair,
      initialIllustration && initialIllustration.hair ? initialIllustration.hair : defaultAvatar.hair,
    ),
  )
  const [facialHairIndex, setFacialHairIndex] = useState(
    getIndexByValueAndType(
      Types.FacialHair,
      initialIllustration && initialIllustration.facialHair ? initialIllustration.facialHair : defaultAvatar.facialHair,
    ),
  )
  const [faceIndex, setFaceIndex] = useState(
    getIndexByValueAndType(
      Types.Face,
      initialIllustration && initialIllustration.face ? initialIllustration.face : defaultAvatar.face,
    ),
  )
  const [accessoryIndex, setAccessoryIndex]  = useState(
    getIndexByValueAndType(
      Types.Accessories,
      initialIllustration && initialIllustration.accessory ? initialIllustration.accessory : defaultAvatar.accessory,
    ),
  )
  const [, setImage] = useSetState(
    initialImage && initialImage.large && initialImage.small && initialImage.medium ? {
    large: initialImage.large,
    medium: initialImage.medium,
    small: initialImage.small,
  } : null)
  const [src, setSrc] = useState(initialImage && initialImage.large ? initialImage.large : null)
  const [files, setFiles] = useSetState({ small: null, medium: null, large: null })
  const [loadingUpload, setLoadingUpload] = useState(false)
  const [error, setError] = useState(null)
  const [useImage, setUseImage] = useState(initialImage && initialImage.large !== null)
  const inputFile = useRef(null)

  useEffect(() => {
    setIllustration({
      hair: HairOptions[hairIndex].value,
      facialHair: FacialHairOptions[facialHairIndex].value,
      face: FaceOptions[faceIndex].value,
      accessory: AccessoriesOptions[accessoryIndex].value,
    })
    setError(null)
  }, [hairIndex, facialHairIndex, accessoryIndex, faceIndex])

  const handleSubmit = async () => {
    // remove typename
    // eslint-disable-next-line no-unused-vars
    const { __typename, ...restIllustration } = illustration
    // eslint-disable-next-line no-unused-vars
    try {
      if (files.small && files.medium && files.large) {
        const uploaded = await uploadFiles()
        setSrc(uploaded.large)
        setImage(uploaded)
        onSubmit({
          illustration: restIllustration,
          image: useImage ? uploaded : null,
        })
      } else {
        setSrc(null)
        onSubmit({
          illustration: restIllustration,
          image: null,
        })
      }
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error(err)
    }
  }

  const openFile = () => {
    inputFile.current.click();
  }

  // create small, medium, large file
  const generateImageFiles = (file) => {
    Resizer.imageFileResizer(
      file,
      240,
      240,
      'JPEG',
      100,
      0,
      blob => {
        setFiles({ large: new File([blob], file.name || 'avatar.jpg', { type: 'image/jpeg' }) })
      },
      'blob',
    );
    Resizer.imageFileResizer(
      file,
      80,
      80,
      'JPEG',
      100,
      0,
      blob => {
        setFiles({ medium: new File([blob], file.name || 'avatar.jpg', { type: 'image/jpeg' }) })
      },
      'blob',
    );
    Resizer.imageFileResizer(
      file,
      60,
      60,
      'JPEG',
      100,
      0,
      blob => {
        setFiles({ small: new File([blob], file.name || 'avatar.jpg', { type: 'image/jpeg' }) })
      },
      'blob',
    );
  }

  const onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    generateImageFiles(file)
  }

  const uploadFiles = async () => {
    setLoadingUpload(true)
    const small = await uploadAndGetUrl(files.small)
    const medium = await uploadAndGetUrl(files.medium)
    const large = await uploadAndGetUrl(files.large)
    setLoadingUpload(false)
    return({
      small,
      medium,
      large,
    })
  }

  const uploadAndGetUrl = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.CLOUDINARY_PRESET)
    formData.append('folder', process.env.NODE_ENV)
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/voluntarios/image/upload",
        {
          method: "post",
          body: formData,
        },
      )
      const data = await response.json()
      setError(null)
      return data.secure_url
    } catch (e) {
      setError(e.message)
    }

  }

  useEffect(() => {
    if (files.large) {
      Resizer.imageFileResizer(
        files.large,
        240,
        240,
        'JPEG',
        80,
        0,
        blob => {
          const img = URL.createObjectURL(blob);
          setSrc(img)
          setUseImage(true)
        },
        'blob',
      );
    }
  }, [files])

  const handleChangeUseImage = (e) => {
    const isChecked = e.target.checked
    setUseImage(isChecked)
  }

  const isDisabled =
    loading
    || loadingUpload
    || (
      (initialImage && initialImage.large && initialImage.large === src)
      && !((initialImage && initialImage.large !== null) !== useImage)
    )

  return (
    <div className="avatar-form__wrapper">
      <div className="avatar-form">
        <div className="avatar-form__form">
          <div className="avatar-form__top">
            <input
              type="file"
              accept="image/x-png,image/png,image/jpeg"
              id="file"
              ref={inputFile}
              onChange={onChangeFile}
              style={{ display: 'none' }}
            />
            <ButtonAction
              icon={faUpload}
              className={`btn--secondary btn--stretch ${(loading || loadingUpload) && 'btn--disabled'}`}
              onClick={openFile}
            >
              Carregar
            </ButtonAction>
          </div>
          <Spacer y={1} />
          <div className={`avatar-form__sliders ${useImage ? 'avatar-form__sliders--disabled' : ''}`}>
            <div className={`avatar-form__option ${useImage ? 'avatar-form__option--disabled' : ''}`}>
              <div className="avatar-form__label">
                <span>Cabelo:</span>
                {HairOptions[hairIndex].label}
              </div>
              <Range
                min={0}
                max={HairOptions.length - 1}
                value={hairIndex}
                tooltip={false}
                orientation="horizontal"
                onChange={setHairIndex}
              />
            </div>
            <div className={`avatar-form__option ${useImage ? 'avatar-form__option--disabled' : ''}`}>
              <div className="avatar-form__label">
                <span>Barba:</span>
                {FacialHairOptions[facialHairIndex].label}
              </div>
              <Range
                min={0}
                max={FacialHairOptions.length - 1}
                value={facialHairIndex}
                tooltip={false}
                orientation="horizontal"
                onChange={setFacialHairIndex}
              />
            </div>
            <div className={`avatar-form__option ${useImage ? 'avatar-form__option--disabled' : ''}`}>
              <div className="avatar-form__label">
                <span>Óculos:</span>
                {AccessoriesOptions[accessoryIndex].label}
              </div>
              <Range
                min={0}
                max={AccessoriesOptions.length - 1}
                value={accessoryIndex}
                tooltip={false}
                orientation="horizontal"
                onChange={setAccessoryIndex}
              />
            </div>
            <div className={`avatar-form__option ${useImage ? 'avatar-form__option--disabled' : ''}`}>
              <div className="avatar-form__label">
                <span>Cara:</span>
                {FaceOptions[faceIndex].label}
              </div>
              <Range
                min={0}
                max={FaceOptions.length - 1}
                value={faceIndex}
                tooltip={false}
                orientation="horizontal"
                onChange={setFaceIndex}
              />
            </div>
            {src && (
              <>
                <Spacer y={0.5} />
                <Checkbox
                  initialCheck={useImage}
                  checked={useImage}
                  onChange={handleChangeUseImage}
                  disabled={!src}
                >
                    Usar imagem
                </Checkbox>
              </>
            )}
          </div>
        </div>
        <Spacer x={2} />
        <div className="avatar-form__avatar">
          <Avatar size="xl" src={useImage ? src : null} {...illustration} />
          <Spacer y={1} />
          <Confetti active={successToggle} config={confettiConfig} />
          <ButtonAction
            className={`btn--stretch ${isDisabled && 'btn--disabled'}`}
            onClick={handleSubmit}
            icon={faSave}
          >
            Gravar
          </ButtonAction>
          {successToggle && (
            <>
              <Spacer y={1} />
              <Link href="/profile">
                <a>
                  <ButtonAction className="btn--stretch btn--secondary btn--small">
                    Editar perfil
                  </ButtonAction>
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
      {error && (
        <div className="avatar-form__notes">
          <Spacer y={1} />
          <Note label={false} type="error" style={{width: '100%'}}>Ocorreu um erro ao carregar a imagem.</Note>
        </div>
      )}
    </div>
  )
}

export default AvatarForm