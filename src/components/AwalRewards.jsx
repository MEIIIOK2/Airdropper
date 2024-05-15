

function AwaliableRewards(props) {

    const canClaim = props.canClaim
    const claimed = props.claimed

 
        
    if (!claimed) {
        return(
            <h2>
                {canClaim ?
            `You can claim ${props.claimAmount} $TAPE` 
           
            :
            "Connect wallet to see your reward"}
            </h2>
            
        )
    }
    
    
    return (
        <h2>
            You have already claimed your reward
        </h2>
        
     );
}

export default AwaliableRewards;