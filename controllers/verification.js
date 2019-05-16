module.exports = (req, res) => {
    const hubChallenge = req.query['hub.challenge'];
    const hubMode = req.query['hub.mode'];
    console.log('hubChallenge-' + hubChallenge);
    console.log('hubMode-' + hubMode);
    const verifyTokenMatchs = (req.query['hub.verify_token']) === 'crowdbotics';

    if(hubMode && verifyTokenMatchs){
        res.status(200).send(hubChallenge);
    }else{
        res.status(403).send();
    }
}