import React, { useEffect, useState } from 'react'
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
import { Spacer } from '@zeit-ui/react'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import Confetti from 'react-dom-confetti';
import { confettiConfig } from '../../../services/contants'
import Link from 'next/link'

const AvatarForm = ({
  src = null,
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

  useEffect(() => {
    setIllustration({
      hair: HairOptions[hairIndex].value,
      facialHair: FacialHairOptions[facialHairIndex].value,
      face: FaceOptions[faceIndex].value,
      accessory: AccessoriesOptions[accessoryIndex].value,
    })
  }, [hairIndex, facialHairIndex, accessoryIndex, faceIndex])

  const handleSubmit = () => {
    // remove typename
    // eslint-disable-next-line no-unused-vars
    const { __typename, ...rest} = illustration
    onSubmit({
      illustration: rest,
    })
  }

  return (
    <div className="avatar-form">
      <div className="avatar-form__form">
        {/* <div className="avatar-form__top">
          <ButtonAction icon={faUpload} className="btn--secondary btn--stretch">
            Carregar
          </ButtonAction>
        </div> */}
        <Spacer y={1} />
        <div className="avatar-form__sliders">
          <div className="avatar-form__option">
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
          <div className="avatar-form__option">
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
          <div className="avatar-form__option">
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
          <div className="avatar-form__option">
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
        </div>
      </div>
      <Spacer x={2} />
      <div className="avatar-form__avatar">
        <Avatar size="xl" src={src} {...illustration} />
        <Spacer y={1} />
        <Confetti active={successToggle} config={confettiConfig} />
        <ButtonAction
          className={`btn--stretch ${loading && 'btn--disabled'}`}
          onClick={handleSubmit}
          icon={faSave}
        >
          {successToggle ? 'Editar' : 'Gravar'}
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
  )
}

export default AvatarForm