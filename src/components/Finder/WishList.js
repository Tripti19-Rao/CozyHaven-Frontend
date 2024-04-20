import { useContext } from "react"
import FinderContext from "../../ContextApi/FinderContext"

export default function WishList() {
    const {finder} = useContext(FinderContext)
    console.log(finder.data)
    return (
        <div style={{margin: '100px'}}>
            <h1>WishList - {finder.data?.wishList?.length}</h1>
            
        </div>
    )
}