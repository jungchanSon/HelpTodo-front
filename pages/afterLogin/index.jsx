import CreateTeamForm from '../../components/AfterLogin/CreateTeamForm'
import UserTeamList from '../../components/AfterLogin/UserTeamList'
import JoinTeamForm from '../../components/AfterLogin/JoinTeamForm'
import Line from '../../components/Line'

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