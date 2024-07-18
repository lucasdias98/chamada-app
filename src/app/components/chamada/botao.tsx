interface BotaoProps {
    children: any
    cor: string
    className?: string
}
export default function Botao(props: BotaoProps) {
    return (<button className={`${props.cor}
    text-white px-4 py-2 rounded-md
    ${props.className} `}>
        {props.children}
    </button>
    )
}