import { withA11y } from "@storybook/addon-a11y";
import Share from './Share'

export default {
    title: "Molecules/Share",
    decorators: [withA11y],
};

export const ShareComponent = () => (
    <div>
        <Share
            facebookUrl='hello'
            linkedinUrl='hello'
            twitterUrl='hello'
            url='hello'
        />
    </div>
)
