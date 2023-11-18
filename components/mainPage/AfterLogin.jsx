import CreateTeamForm from '../AfterLogin/CreateTeamForm'
import Line from '../Line'
import JoinTeamForm from '../AfterLogin/JoinTeamForm'
import UserTeamList from '../AfterLogin/UserTeamList'

const AfterLogin = () => {
    return (
        <div>
            <CreateTeamForm />
            <Line />
            <JoinTeamForm />
            <Line />
            <UserTeamList />
        </div>
    )
}

export default AfterLogin