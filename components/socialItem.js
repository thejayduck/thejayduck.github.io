import styles from "styles/SocialItem.module.scss"

export default function SocialItem({ icon, title, url }) {
    return (
        <li className={`cardItem ${styles.social}`}>
            <a aria-label={title} target="_blank" title={title} href={url} rel="noreferrer">
                <i className={icon} />
            </a>
        </li>
    )
}