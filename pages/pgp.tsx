import styles from '../styles/Components.module.scss'
import Link from 'next/link'
import {CopyOutlined, DownloadOutlined, LeftOutlined} from '@ant-design/icons'
import {useState} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'

export default function GpgPage() {
    const [copied, setCopied] = useState(false)
    return <div className={styles.pgpContainer}>
        <div className={styles.id} title="00D9 333B 9F76 43C1 D674  53A4 41B3 7208 0BBC B8C1">
            41B3 7208 0BBC B8C1
        </div>
        <div className={styles.buttons}>
            <CopyToClipboard text={pubKey}
                             onCopy={() => {
                                 setCopied(true)
                                 setTimeout(() => setCopied(false), 1000)
                             }}>
                <div>
                    <CopyOutlined/>
                    <span className={styles.text}>
                    {copied ? '已复制！' : '复制公钥到剪贴板'}
                    </span>
                </div>
            </CopyToClipboard>
            <div onClick={download}>
                <DownloadOutlined/>
                <span className={styles.text}>下载公钥</span>
            </div>
        </div>
        <div className={styles.back}>
            <Link href="/">
                <a>
                    <LeftOutlined/>
                </a>
            </Link>
        </div>
    </div>
}

function download() {
    const blob = new Blob([pubKey])
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'Clansty Rin (凌莞)_0x0BBCB8C1_public.asc'
    link.click()
}

const pubKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

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
=U+zZ
-----END PGP PUBLIC KEY BLOCK-----
`
