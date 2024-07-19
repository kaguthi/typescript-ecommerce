import { studentDetail } from "@/utils/types"
import { useQuery } from "@tanstack/react-query"

function Profile() {

  const { isLoading, data, error } = useQuery<studentDetail[], Error>({
    queryKey: ["user"],
    queryFn: () => {
      fetch()
    } 
  })
  return (
    <div>
    </div>
  )
}

export default Profile