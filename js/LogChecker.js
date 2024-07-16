const Profiles = document.getElementById('Profiles')
const Logs = document.getElementById('Logs')

function checker(){
	connectedProfiles = []
	maxExecutionTimeProfiles = []
	accountRestrictedProfiles = []
	captchaVerificationProfiles = []
	wrongPasswordProfiles = []
	phoneNumberProfiles = []
	unusualActivityProfiles = []
	othersProfiles = []
	accountDisabledProfiles = []
	proxyDownProfiles = []
	notLogs = []
	const profilesValue = Profiles.value
	const logsValue = Logs.value

	profilesArr = getArraySplited(profilesValue,"\n")
	logsArr = getArraySplited(logsValue,"\n")

	if (profilesArr.length - logsArr.length > 0) {
		alert('profiles numbre > logs numbre')
	} else if (profilesArr.length - logsArr.length < 0) {
		alert('profiles numbre < logs numbre')
	} else {
		for (var i = 0; i < logsArr.length; i++) {
			log = logsArr[i]
			log = log.toLowerCase()
			
			if (log == '') {
				notLogs.push(profilesArr[i])
			} else if (log == 'matched') {
				connectedProfiles.push(profilesArr[i])
			} else if (log.split("proxy down").length>1 && log.split("proxy down")[log.split("proxy down").length-1] == '') {
				proxyDownProfiles.push(profilesArr[i])
			} else {
				logArr = getArraySplited(log, "update_status : ")
				log = logArr[logArr.length-1]
				logArr = getArraySplited(log," ; ")
				log = logArr[logArr.length-1]
				
				switch (log) {
					case "connected":
						connectedProfiles.push(profilesArr[i])
						break;
					case "active":
						connectedProfiles.push(profilesArr[i])
						break;
					case "matched":
						connectedProfiles.push(profilesArr[i])
						break;
					case "max_execution_time":
						maxExecutionTimeProfiles.push(profilesArr[i])
						break;
					case "account_restricted":
						accountRestrictedProfiles.push(profilesArr[i])
						break;
					case "captcha_verification":
						captchaVerificationProfiles.push(profilesArr[i])
						break;
					case "wrong_password":
						wrongPasswordProfiles.push(profilesArr[i])
						break;
					case "phone_number":
						phoneNumberProfiles.push(profilesArr[i])
						break;
					case "unusual_activity":
						unusualActivityProfiles.push(profilesArr[i])
						break;
					case "account_disabled":
						accountDisabledProfiles.push(profilesArr[i])
						break;
					case "proxy down":
						proxyDownProfiles.push(profilesArr[i])
						break;
					case "others":
						othersProfiles.push(profilesArr[i])
						break;
					default:
						othersProfiles.push(profilesArr[i])
						break;
				}
			}
		}
		
		console.log(connectedProfiles)
		console.log(maxExecutionTimeProfiles)
		console.log(accountRestrictedProfiles)
		console.log(captchaVerificationProfiles)
		console.log(wrongPasswordProfiles)
		console.log(phoneNumberProfiles)
		console.log(unusualActivityProfiles)
		console.log(othersProfiles)
		console.log(accountDisabledProfiles)
		console.log(proxyDownProfiles)
		console.log(notLogs)
	}
}

function getArraySplited (inputValue, seperateur){
	inputValueArray = inputValue.split(seperateur)
	if (inputValueArray[inputValueArray.length - 1] == '') {
		inputValueArray.pop()
	}
	return inputValueArray
}