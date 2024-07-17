const Profiles = document.getElementById('Profiles')
const All = document.getElementById('All')
const Drops = document.getElementById('Drops')
const Entity = document.getElementById('Entity')

const Result = document.getElementById('result')

function Diviseur() {
	const profilesValue = Profiles.value
	const allValue = All.value
	const dropsValue = Drops.value
	const entityValue = Entity.value

	if (profilesValue == '' || allValue == '' || entityValue == '') {
		alert("Empty inputs / textarea")
	} else {
		Result.removeAttribute('style')

		profilesArr = getArraySplited(profilesValue,"\n")
		allArr = getArraySplited(allValue,"\n")

		sortAll = []

		for (var i = 0; i < allArr.length; i++) {
			profileTag = allArr[i]
			profilesTagArr = getArraySplited(profileTag,"\t")
			sortAll.push(profilesTagArr)
		}

		const filteredArr = sortAll.filter(item => profilesArr.includes(item[0]));

	    const profilesArray = [];
	    const tagsArray = [];

	    filteredArr.forEach(item => {
	        profilesArray.push(item[0]);
	        tagsArray.push(item[1]);
	    });

	    profilesArrayDivised = splitArrayIntoSubarrays(profilesArray,dropsValue)
	    tagsArrayDivised = splitArrayIntoSubarrays(tagsArray,dropsValue)

	    for (var i = 0; i < dropsValue; i++) {
	    	innerHtmlMulti(i,entityValue,arrayToString(profilesArrayDivised[i]),"Profiles")
	    	innerHtmlMulti(i,entityValue,arrayToString(tagsArrayDivised[i]),"Tags")
	    }
	   	
	}
}	

Drops.addEventListener('input', function() {
    const inputValue = Drops.value;

    if (inputValue<1) {
    	Drops.value = 1
    }
});

function innerHtmlMulti(numberOfDepot,entityName,value,type) {
	numberOfDepot++
	const inner = `<div>
		  	<label  class="d-flex align-items-center justify-content-between" for="${entityName}_${numberOfDepot}_${type}">
			  	${entityName} Depot ${numberOfDepot} : ${type}
			  	<span class = "btn btn-info" onclick="copyFromThis('${entityName}_${numberOfDepot}_${type}')">
			  		Copy
			  	</span>
			  	<i class="fa fa-download btn btn-success" onclick="downloadToTxt('${entityName}_${numberOfDepot}_${type}','${numberOfDepot}')"></i>
		  	</label>
		  	<textarea class="form-control my-2" readonly="readonly" id="${entityName}_${numberOfDepot}_${type}">${value}</textarea>
		</div>`
	Result.innerHTML += inner 
}
function splitArrayIntoSubarrays(arr, divisor) {
    const result = [];
    const len = arr.length;
    const subarraySize = Math.floor(len / divisor);
    let startIndex = 0;

    for (let i = 0; i < divisor - 1; i++) {
        const endIndex = startIndex + subarraySize;
        result.push(arr.slice(startIndex, endIndex));
        startIndex = endIndex;
    }

    // Push the remaining elements into the last subarray
    result.push(arr.slice(startIndex));

    return result;
}
function copyFromThis(id){
	const textarea = document.getElementById(id)
	copyToClipboard(textarea)
}
function downloadToTxt(id,numberOfDepot) {
	const textarea = document.getElementById(id)
	textareaValue = textarea.value
	textareaArray = getArraySplited (textareaValue, '\n')
    const content = textareaArray.join(";");		
    fileName = `file_${numberOfDepot}.txt`
	downloadFile(content, fileName, "text/plain");
}
