import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/ui/button.jsx"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card.jsx"

export default function GroupCard(props) {
  const navigate = useNavigate();
  return (
    <Card className="transition-all sm:col-span-2 m-2 hover:-translate-y-3 hover:border-orange-500">
      <CardHeader className="pb-3">
        <CardTitle>{ props.groupName }</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          { props.description }
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={() => navigate(`/group/${props.groupName}`)}>View Group</Button>
      </CardFooter>
    </Card>
  )
}
