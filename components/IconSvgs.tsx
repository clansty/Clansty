import Icon from '@ant-design/icons'

const TelegramSvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024" aria-hidden={true}>
        <path
            d="M417.28 795.733333 429.226667 615.253333 756.906667 320C771.413333 306.773333 753.92 300.373333 734.72 311.893333L330.24 567.466667 155.306667 512C117.76 501.333333 117.333333 475.306667 163.84 456.533333L845.226667 193.706667C876.373333 179.626667 906.24 201.386667 894.293333 249.173333L778.24 795.733333C770.133333 834.56 746.666667 843.946667 714.24 826.026667L537.6 695.466667 452.693333 777.813333C442.88 787.626667 434.773333 795.733333 417.28 795.733333Z"
        />
    </svg>
)

const GnuPGSvg = () => (<svg width="1em" height="1em" fill="currentColor" viewBox="0 0 200 200" aria-hidden={true}>
    <g transform="translate(-258.09 -439.96)">
        <g transform="translate(2.264 1.8945)">
            <g transform="matrix(1.8553 0 0 1.8553 -191.29 -551.12)">
                <path
                    d="m294.22 537.96c-22.056 0-30.562 21.539-30.562 24.219v23h-5.5625v24.25s11.467-13.73 35.094-13.906c14.818-0.12521 32.844-10.094 32.844-10.094v-23c0-2.4163-7.8941-24.469-31.812-24.469zm13.625 7.4375s-13.553-3.7037-24.875 2.7812c-8.2799 4.7424-13.875 15.156-13.875 15.156s4.1693-13.291 12.725-17.434c8.5364-4.0668 17.342-3.7582 26.025-0.50381zm-12.625 7.3125c13.444 0 16.531 12.396 16.531 14.656v17.938h-33.844l-0.25-18.938c0-2.0359 4.1874-13.656 17.562-13.656z"
                />
                <path
                    d="m331.69 591.88v44.286h-63.036c8.2625-4.7604 17.248-3.5714 26.429-3.5714 0 0 11.393 0.0891 27.5-13.036 0 0-15.963 7.1902-39.286 2.5 0 0 33.635 1.3445 47.679-21.524 0 0-13.257 9.1135-37.411 9.1135 0 0 15.59 1.9804 38.125-17.768z"
                />
            </g>
        </g>
    </g>
</svg>)

export const TelegramIcon = props => <Icon component={TelegramSvg} aria-label="Telegram" {...props} />
export const GnuPGIcon = props => <Icon component={GnuPGSvg} aria-label="GnuPG" {...props} />
