export default function Twemoji({unicode, text}: { unicode: string, text: string }) {
    return <img alt={text} src={`https://twemoji.maxcdn.com/2/svg/${unicode}.svg`}
                style={{width: '1em', height: '1em', margin: '0px 0.05em 0px 0.1em', verticalAlign: '-0.1em'}}
                draggable={false}
    />
}
