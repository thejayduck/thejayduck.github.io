import styles from "../styles/components/SocialItem.module.scss"

interface SocialItemProps{
    icon: string,
    title: string,
    url: string
}

export default function SocialItem({ icon, title, url }: SocialItemProps) {
    return (
        <li className={`cardItem ${styles.social}`}>
            <a aria-label={title} target="_blank" title={title} href={url} rel="noreferrer">
                <i className={icon} />
            </a>
        </li>
    )
}