export { default as ContainerProfile } from '../../components/ContainerProfile.vue'
export { default as DarkModeSwitcher } from '../../components/DarkModeSwitcher.vue'
export { default as Description } from '../../components/Description.vue'
export { default as Logo } from '../../components/Logo.vue'
export { default as MailMe } from '../../components/MailMe.vue'
export { default as SocialMedia } from '../../components/SocialMedia.vue'
export { default as SquareImageProfile } from '../../components/SquareImageProfile.vue'

export const LazyContainerProfile = import('../../components/ContainerProfile.vue' /* webpackChunkName: "components/ContainerProfile" */).then(c => c.default || c)
export const LazyDarkModeSwitcher = import('../../components/DarkModeSwitcher.vue' /* webpackChunkName: "components/DarkModeSwitcher" */).then(c => c.default || c)
export const LazyDescription = import('../../components/Description.vue' /* webpackChunkName: "components/Description" */).then(c => c.default || c)
export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/Logo" */).then(c => c.default || c)
export const LazyMailMe = import('../../components/MailMe.vue' /* webpackChunkName: "components/MailMe" */).then(c => c.default || c)
export const LazySocialMedia = import('../../components/SocialMedia.vue' /* webpackChunkName: "components/SocialMedia" */).then(c => c.default || c)
export const LazySquareImageProfile = import('../../components/SquareImageProfile.vue' /* webpackChunkName: "components/SquareImageProfile" */).then(c => c.default || c)
