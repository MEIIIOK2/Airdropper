

function AwaliableRewards(props) {

    const claimAmount = props.claimAmount
    const claimed = props.claimed
    const walletConnected = props.walletConnected

 
        
    if (!claimed) {

        if (walletConnected){
            if (claimAmount > 0) {
                return (<h2>{`You can claim ${props.claimAmount} $TAPE`}</h2>)
            }
            else{
                return (<h2>You are still not eligible</h2>)
            }
        }
        return(
            <h2>Connect wallet to see your reward</h2>
        )


        // return(
        //     <h2>
        //         {canClaim ?
        //     `You can claim ${props.claimAmount} $TAPE` 
           
        //     :
        //     "Connect wallet to see your reward"}
        //     </h2>
            
        // )
    }
    
    
    return (
        <h2>
            You have already claimed your reward
        </h2>
        
     );
}

export default AwaliableRewards;