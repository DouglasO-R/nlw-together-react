type Props = {
    children?: string;
}

export function TextBox(props:Props) {
    return (
        <div>
            <p>{props.children}</p>
        </div>
    )
}