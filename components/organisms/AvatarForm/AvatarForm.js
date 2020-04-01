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
} from './../../atoms/Avatar/utils'
import { Spacer } from '@zeit-ui/react'
import { faImage } from '@fortawesome/free-solid-svg-icons'

const AvatarForm = ({
  src = null,
  initialIllustration = {
    accessory: null,
    face: null,
    hair: null,
    facialHair: null,
  },
}) => {
  const [illustration, setIllustration] = useSetState(initialIllustration)
  const [hairIndex, setHairIndex] = useState(initialIllustration.hair ? getIndexByValueAndType(Types.Hair, initialIllustration.hair) : 0)
  const [facialHairIndex, setFacialHairIndex] = useState(initialIllustration.facialHair ? getIndexByValueAndType(Types.FacialHair, initialIllustration.facialHair) : 0)
  const [faceIndex, setFaceIndex] = useState(initialIllustration.face ? getIndexByValueAndType(Types.Face, initialIllustration.face) : 0)
  const [accessoryIndex, setAccessoryIndex] = useState(initialIllustration.accessory ? getIndexByValueAndType(Types.Accessory, initialIllustration.accessory) : 0)

  useEffect(() => {
    setIllustration({
      hair: HairOptions[hairIndex].value,
      facialHair: FacialHairOptions[facialHairIndex].value,
      face: FaceOptions[faceIndex].value,
      accessory: AccessoriesOptions[accessoryIndex].value,
    })
  }, [hairIndex, facialHairIndex, accessoryIndex, faceIndex])

  const handleSubmit = () => {
    console.log('submit avatar', illustration)
  }

  return (
    <div className="avatar-form">
      <div className="avatar-form__form">
        <div className="avatar-form__top">
          <span className="avatar-form__title">Avatar</span>
          <ButtonAction icon={faImage} className="btn--secondary">
            Carregar
          </ButtonAction>
        </div>
        <Spacer y={1} />
        <div className="avatar-form__sliders">
          <div className="avatar-form__option">
            <div className="avatar-form__label">
              <span>Cara:</span>
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
              <span>Acessórios:</span>
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
        <ButtonAction className="btn--stretch" onClick={handleSubmit}>
            Criar avatar
        </ButtonAction>
      </div>
    </div>
  )
}

export default AvatarForm