import React from 'react'
import styled from 'styled-components'
import {SanityMonogram} from '@sanity/logos'

const Root = styled.div`
  position: absolute;
  width: 18px;
  height: 18px;
  background: var(--card-bg-color);
  bottom: -4px;
  right: -4px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--card-bg-color);
  box-sizing: content-box;

  svg {
    box-sizing: content-box;
    border: 1px solid var(--card-hairline-soft-color);
    border-radius: 50%;
    padding: 2px;
    width: 12px;
    height: 12px;
  }
`

const Google = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0)">
      <path
        d="M12 6.13764C12 5.72977 11.9663 5.31971 11.8943 4.91846H6.12036V7.22895H9.42684C9.28963 7.97412 8.84876 8.63332 8.20322 9.05221V10.5514H10.1759C11.3342 9.50637 12 7.9631 12 6.13764Z"
        fill="#4285F4"
      />
      <path
        d="M6.12019 12.0002C7.77118 12.0002 9.16349 11.4688 10.1779 10.5517L8.20529 9.05253C7.65646 9.41851 6.94793 9.62574 6.12244 9.62574C4.52544 9.62574 3.17136 8.56971 2.68552 7.1499H0.649902V8.69537C1.68908 10.7215 3.80567 12.0002 6.12019 12.0002V12.0002Z"
        fill="#34A853"
      />
      <path
        d="M2.68332 7.14986C2.4269 6.40469 2.4269 5.59778 2.68332 4.8526V3.30713H0.649951C-0.218278 5.00252 -0.218278 6.99995 0.649951 8.69533L2.68332 7.14986V7.14986Z"
        fill="#FBBC04"
      />
      <path
        d="M6.12019 2.37483C6.99291 2.3616 7.8364 2.68348 8.46845 3.27433L10.2161 1.56131C9.1095 0.542752 7.64071 -0.017233 6.12019 0.000404333C3.80566 0.000404333 1.68908 1.27911 0.649902 3.3074L2.68326 4.85288C3.16686 3.43087 4.52319 2.37483 6.12019 2.37483V2.37483Z"
        fill="#EA4335"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="12" height="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const GitHub = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0)">
      <path
        d="M11.195 3.13503C10.6711 2.22838 9.91808 1.47537 9.01144 0.951471C8.09222 0.414976 7.08837 0.146729 5.99987 0.146729C4.91137 0.146729 3.90752 0.414976 2.98831 0.951471C2.08163 1.47534 1.32862 2.22836 0.804744 3.13503C0.268248 4.05497 0 5.05883 0 6.14659C0 7.45399 0.381531 8.62978 1.14459 9.67394C1.90765 10.7181 2.89327 11.4408 4.10143 11.8419C4.24208 11.868 4.34624 11.8497 4.41392 11.7872C4.44666 11.7577 4.47263 11.7215 4.49006 11.681C4.50749 11.6405 4.51595 11.5967 4.51488 11.5527C4.51488 11.537 4.51361 11.3963 4.51105 11.1307C4.5085 10.8651 4.50722 10.6334 4.50722 10.4355L4.32745 10.4666C4.18407 10.4895 4.03885 10.4986 3.89375 10.494C3.71159 10.4908 3.53001 10.4725 3.35087 10.4393C3.16049 10.4045 2.98119 10.3246 2.82796 10.2064C2.66705 10.0846 2.54715 9.91661 2.48428 9.72484L2.40602 9.54506C2.34022 9.40286 2.25754 9.2691 2.15976 9.14666C2.04775 9.00072 1.93447 8.90176 1.81991 8.84977L1.76518 8.81064C1.72769 8.78356 1.6936 8.75205 1.66367 8.71679C1.63479 8.6841 1.61108 8.64719 1.59334 8.60734C1.57766 8.57085 1.5907 8.54085 1.63247 8.51731C1.67461 8.49405 1.75123 8.48256 1.86068 8.48256L2.01692 8.50582C2.12108 8.52662 2.24996 8.5891 2.40356 8.69326C2.5585 8.79876 2.68797 8.93748 2.78254 9.09932C2.90239 9.31294 3.04695 9.47575 3.21624 9.58775C3.38552 9.69976 3.55609 9.75576 3.72793 9.75576C3.87725 9.7578 4.02641 9.74479 4.17312 9.7169C4.29459 9.69195 4.41264 9.65254 4.52473 9.59952C4.57162 9.25037 4.69931 8.98212 4.90782 8.79477C4.63684 8.76849 4.36827 8.72157 4.10444 8.6544C3.84797 8.58382 3.60133 8.48141 3.37029 8.34958C3.12825 8.218 2.91442 8.04015 2.74095 7.82613C2.57421 7.6178 2.4374 7.34417 2.3305 7.00524C2.2236 6.6663 2.1707 6.27584 2.1718 5.83383C2.1718 5.20357 2.37757 4.66708 2.7891 4.22435C2.59629 3.75006 2.61453 3.21885 2.84383 2.63073C2.99487 2.58385 3.21879 2.61897 3.51559 2.73608C3.81239 2.85319 4.02983 2.95352 4.16792 3.03707C4.30601 3.12025 4.41665 3.19058 4.49983 3.24804C5.48153 2.9773 6.51821 2.9773 7.49991 3.24804L7.79679 3.0606C8.0249 2.92356 8.26549 2.80849 8.51535 2.71693C8.79135 2.61276 9.00231 2.58412 9.14825 2.63101C9.38248 3.21949 9.40327 3.7507 9.21064 4.22462C9.62199 4.66735 9.82776 5.20385 9.82795 5.83411C9.82795 6.27684 9.77459 6.66904 9.66787 7.01071C9.56116 7.35238 9.42325 7.62601 9.25415 7.8316C9.07785 8.04326 8.86311 8.21966 8.62124 8.35149C8.39008 8.48329 8.14337 8.5857 7.88682 8.65632C7.62412 8.72277 7.35674 8.76915 7.087 8.79505C7.35698 9.02927 7.49206 9.3994 7.49225 9.90543V11.5527C7.49115 11.5964 7.49929 11.6398 7.51612 11.6802C7.53295 11.7206 7.5581 11.7569 7.58993 11.7869C7.65505 11.8493 7.75794 11.8675 7.89858 11.8416C9.10693 11.4403 10.0926 10.7177 10.8557 9.67367C11.6188 8.62968 12.0003 7.4539 12.0003 6.14632C11.9997 5.05873 11.7313 4.05497 11.195 3.13503V3.13503Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="12" height="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const Saml = (
  <svg width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.0691681 5.98162C0.115833 7.24157 1.07247 8.00221 2.59841 8.00221C4.17102 8.00221 5.12299 7.19957 5.12299 5.86962C5.12299 4.83832 4.55367 4.25501 3.25172 3.96569L2.56108 3.80703C1.8331 3.64837 1.53445 3.38704 1.53445 2.91106C1.53445 2.40708 1.94977 2.09442 2.61708 2.09442C3.27505 2.09442 3.6997 2.43508 3.75103 2.99039H5.00166C4.95966 1.78643 4.01236 0.997795 2.60308 0.997795C1.14713 0.997795 0.218496 1.79577 0.218496 3.05105C0.218496 4.04968 0.815808 4.69366 2.03376 4.96898L2.73374 5.13231C3.51304 5.30497 3.8117 5.54763 3.8117 6.00495C3.8117 6.55093 3.34972 6.90092 2.62174 6.90092C1.85644 6.90092 1.38045 6.56493 1.31979 5.98162H0.0691681Z"
      fill="#515E72"
    />
    <path
      d="M5.97695 5.98162C6.02362 7.24157 6.98025 8.00221 8.5062 8.00221C10.0788 8.00221 11.0308 7.19957 11.0308 5.86962C11.0308 4.83832 10.4615 4.25501 9.15951 3.96569L8.46886 3.80703C7.74089 3.64837 7.44223 3.38704 7.44223 2.91106C7.44223 2.40708 7.85755 2.09442 8.52486 2.09442C9.18284 2.09442 9.60749 2.43508 9.65882 2.99039H10.9094C10.8674 1.78643 9.92015 0.997795 8.51086 0.997795C7.05492 0.997795 6.12628 1.79577 6.12628 3.05105C6.12628 4.04968 6.72359 4.69366 7.94155 4.96898L8.64153 5.13231C9.42083 5.30497 9.71949 5.54763 9.71949 6.00495C9.71949 6.55093 9.2575 6.90092 8.52953 6.90092C7.76422 6.90092 7.28824 6.56493 7.22758 5.98162H5.97695Z"
      fill="#515E72"
    />
    <path
      d="M16.9852 5.01565V3.98435C16.9852 2.11309 16.0099 0.997795 14.3953 0.997795C12.7807 0.997795 11.8054 2.11309 11.8054 3.98435V5.01565C11.8054 6.88692 12.7807 8.00221 14.3953 8.00221C16.0099 8.00221 16.9852 6.88692 16.9852 5.01565ZM14.3953 6.82625C13.5833 6.82625 13.154 6.21494 13.154 5.00165V3.99835C13.154 2.78506 13.5833 2.17375 14.3953 2.17375C15.2073 2.17375 15.6366 2.78506 15.6366 3.99835V5.00165C15.6366 6.21494 15.2073 6.82625 14.3953 6.82625Z"
      fill="#515E72"
    />
  </svg>
)

interface Props {
  provider: string | undefined
}

export const LoginProviderLogo = ({provider}: Props) => {
  return (
    <Root>
      {provider === 'google' && Google}
      {provider === 'github' && GitHub}
      {provider === 'sanity' && <SanityMonogram />}
      {provider && provider.startsWith('saml-') && Saml}
    </Root>
  )
}
