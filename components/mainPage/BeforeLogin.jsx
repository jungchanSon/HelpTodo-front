import React from 'react'

const BeforeLogin = () => {
    return (
        <div className="">
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    {/*<div className='hidden sm:mb-8 sm:flex sm:justify-center'>*/}
                    {/*    <div*/}
                    {/*        className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>*/}
                    {/*        Announcing our next round of funding.{' '}*/}
                    {/*        <a href='#' className='font-semibold text-indigo-600'>*/}
                    {/*            <span className='absolute inset-0' aria-hidden='true' />*/}
                    {/*            Read more <span aria-hidden='true'>&rarr;</span>*/}
                    {/*        </a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            팀 프로젝트 투두리스트
                        </h1>
                        <p className="mt-3  text-lg leading-8 text-gray-600">
                            팀 프로젝트의 계획을 관리할 수 있게 도와주는 팀 단위 투두리스트
                            서비스입니다. <br /> 팀원들과의 협업을 효율적으로 관리해보세요.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="#"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                시작해보기
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BeforeLogin
