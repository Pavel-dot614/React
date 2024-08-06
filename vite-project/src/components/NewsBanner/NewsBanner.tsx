// import { formatTimeAgo } from "../../helpers/formatTimeAgo"
import Imag from "../image/Image"

import styles from './style.module.css'


const NewsBanner = ({item}: any) => {
    return (
 <div className={styles.banner}>
   <Imag />
    {/* <h3 className={styles.title}>{item.title}</h3>
    <p className={styles.extra}>
      {formatTimeAgo(item.published)} by {item.author}
      </p> */}
 </div>
    )
}

export default NewsBanner