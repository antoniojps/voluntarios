import { withA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";

import Avatar from './Avatar'
import { Hair, Face, FacialHair, Accessories } from './utils'
import { select } from '@storybook/addon-knobs';

const defaultAccessory = 'None';
const accesoryGroup = 'ACCESSORY';

const defaultHair = 'ShortVolumed';
const hairGroup = 'HAIR';

const defaultFace = "Smile"
const faceGroup = 'FACE'

const defaultFacialHair = "None"
const facialHairGroup = "FACIAL_HAIR"

export default {
  title: "Atoms/Avatar",
  decorators: [withA11y, withKnobs],
};

const src = 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg';

export const SmallAvatarSrc = () => <Avatar src={src} size='sm' />
export const MediumAvatarSrc = () => <Avatar src={src} size='md' />
export const LargeAvatarSrc = () => <Avatar src={src} size='lg' />
export const SmallAvatar = () => (
  <Avatar
    size='sm'
    accessory={select('accessory', Accessories, defaultAccessory, accesoryGroup)}
    hair={select('hair', Hair, defaultHair, hairGroup)}
    facialHair={select('facialHair', FacialHair, defaultFacialHair, facialHairGroup)}
    face={select('face', Face, defaultFace, faceGroup)}
  />
)
export const MediumAvatar = () => (
  <Avatar
    size='md'
    accessory={select('accessory', Accessories, defaultAccessory, accesoryGroup)}
    hair={select('hair', Hair, defaultHair, hairGroup)}
    facialHair={select('facialHair', FacialHair, defaultFacialHair, facialHairGroup)}
    face={select('face', Face, defaultFace, faceGroup)}
  />
)
export const LargeAvatar = () => (
  <Avatar
    size='lg'
    accessory={select('accessory', Accessories, defaultAccessory, accesoryGroup)}
    hair={select('hair', Hair, defaultHair, hairGroup)}
    facialHair={select('facialHair', FacialHair, defaultFacialHair, facialHairGroup)}
    face={select('face', Face, defaultFace, faceGroup)}
  />
)