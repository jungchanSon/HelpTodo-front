import { useEffect, useState } from 'react'

const Done = ({ ttdData }) => {
    const [detail, setDetail] = useState()

    useEffect(() => {
        setDetail(ttdData)
    }, [])

    return (
        <>
            {detail ? (
                <div className={'card border-dark mb-3'} style={{ maxWidth: '18rem' }}>
                    <div className={'card-header'}> {detail.createDate} </div>
                    <div className={'card-body text-dark'}>
                        <p className={'card-text'}>{detail.content}</p>
                    </div>
                    <div className={'card-footer'}>삭제하기</div>
                </div>
            ) : null}
        </>
    )
}

export default Done
