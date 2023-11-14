const TeamCard = () => {

    return (
        <div
            className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 lg:mx-auto'>
            <div
                className='mb-6 rounded-lg bg-white p-6 sm:mx-auto sm:w-full sm:max-w-sm mt-4 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md lg:max-w-lg'>
                <h3>팀 이름</h3>
                <div className='mt-2 flex'>
                    <input
                        id='password'
                        name='password'
                        type='password'
                        autoComplete='current-password'
                        required
                        placeholder={'팀 비밀번호'}
                        className='block w-5/6 mr-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                    <button className='w-content'>참가</button>
                </div>
            </div>
        </div>
    )
}

export default TeamCard