

import { createBrowserHistory, createHashHistory } from 'history';
import { DefaultProfileMetaData, ProfileMetaDataTypes } from './constants';
import {store} from '../state';
import {setModalConfig} from '../state/actions';
import BigNumber from 'bignumber.js';

BigNumber.config({ EXPONENTIAL_AT: 100 });

export function configureHistory() {
	return window.matchMedia('(display-mode: standalone)').matches
		? createHashHistory()
		: createBrowserHistory()
}

export function ethToBrowserFormatProfileMetaData(profile) {
	const ProfileKeys = Object.keys(profile);
	const DefaultProfileMetaDataKeys = Object.keys(DefaultProfileMetaData);
	let result = false;
	if(profile && validateProfileMetaDataEthFormat(profile)){
		result = {}
		for(let i = 0; i < ProfileKeys.length; i++) {
			if((typeof profile[i] === "object") && (ProfileMetaDataTypes[DefaultProfileMetaDataKeys[i]] === "number")) {
				result[DefaultProfileMetaDataKeys[i]] = parseInt(profile[i].toString());
			}else {
				result[DefaultProfileMetaDataKeys[i]] = profile[i];
			}
		}
	}
	return result;
}

export function validateProfileMetaDataEthFormat(profile) {
	const DefaultProfileMetaDataKeys = Object.keys(DefaultProfileMetaData);
	const ProfileKeys = Object.keys(profile);
	if(ProfileKeys && (ProfileKeys.constructor === Array) && (ProfileKeys.length === DefaultProfileMetaDataKeys.length)) {
		let result;
		let i;
		for(i = 0; i < ProfileKeys.length; i++) {
			if((typeof profile[i] === "object") && (ProfileMetaDataTypes[DefaultProfileMetaDataKeys[i]] === "number")) {
				if(((result === true) || (result === undefined)) && (typeof parseInt(profile[i].toString()) === ProfileMetaDataTypes[DefaultProfileMetaDataKeys[i]])) {
					result = true;
				}else{
					console.warn(`validateProfileMetaDataEthFormat fails on profile prop: ${profile[i]} - Expected ${ProfileMetaDataTypes[DefaultProfileMetaDataKeys[i]]}, got ${typeof parseInt(profile[i].toString())}`)
					result = false;
				}
			}else if(((result === true) || (result === undefined)) && (typeof profile[i] === ProfileMetaDataTypes[DefaultProfileMetaDataKeys[i]])) {
				result = true;
			}else{
				console.warn(`validateProfileMetaDataEthFormat fails on profile prop: ${profile[i]} - Expected ${ProfileMetaDataTypes[DefaultProfileMetaDataKeys[i]]}, got ${typeof profile[i]}`)
				result = false;
			}
		}
		if(i === ProfileKeys.length){
			return result;
		}
	}
	console.warn("validateProfileMetaDataEthFormat failed on profile:", profile);
	return false;
}

export const debounce = (func, wait, immediate) => {
	var timeout;
	return function() {
		var context = this,
			args = arguments;
		var later = function() {
			timeout = null;
			if ( !immediate ) {
				func.apply(context, args);
			}
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait || 200);
		if ( callNow ) { 
			func.apply(context, args);
		}
	};
};

export const capitaliseFirstLetter = (string) => {
	if(string && string.length > 0) {
		return string.slice(0,1).toUpperCase() + string.slice(1, string.length);
	}
}

export const isConsideredMobile = () => {
	var check = false;
	(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)) || (window.innerWidth <= 720)) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};

export const weiToEther = (wei) => {
	if(typeof wei === "string"){
		return BigNumber(wei).dividedBy('1e18').toString();
	}else{
		return BigNumber(wei.toString()).dividedBy('1e18').toString();
	}
}

export const etherToWei = (ether) => {
	if(typeof ether === "string"){
		return BigNumber(ether).multipliedBy('1e+18').toString();
	}else{
		return BigNumber(ether.toString()).multipliedBy('1e18').toString();
	}
}

export const signalToDaiWei = (wei) => {
	if(typeof wei === "string"){
		return BigNumber(wei).dividedBy('1e2').toString();
	}else{
		return BigNumber(wei.toString()).dividedBy('1e2').toString();
	}
}

export const daiToSignal = (ether) => {
	return BigNumber(ether).multipliedBy('1e2').toString();
}

export const signalToDai = (ether) => {
	return BigNumber(ether).dividedBy('1e2').toString();
}

export const toOnePercent = (value) => {
	return BigNumber(value).dividedBy('1e2').toString();
}

export const tokenValueFormat = (value, decimals = 2) => {
	//Rounds down - I think it is better to under represent this value than to over represent it
	return BigNumber(value).toFixed(decimals, 1).toString();
}

export const tokenValueFormatDisplay = (value, decimals = 2, currency = false) => {
	if(currency) {
		return new BigNumber(tokenValueFormat(value, decimals)).toFormat(2) + ` ${currency}`;
	}
	return new BigNumber(tokenValueFormat(value, decimals)).toFormat(2);
}

export const toNumber = (value) => {
	return BigNumber(value).toNumber();
}

export const addNumbers = (value1, value2) => BigNumber(value1).plus(BigNumber(value2)).toNumber();

export const subtractNumbers = (value1, value2) => BigNumber(value1).minus(BigNumber(value2)).toNumber();

export const areEqualArrays = (arrayOne, arrayTwo) => { 
	if(arrayOne.length !== arrayTwo.length) {
		return false; 
	}else{ 
		for(let i=0; i< arrayOne.length; i++) {
			if(arrayOne[i] !== arrayTwo[i]) {
				return false; 
			}
		}
		return true;
	}
}

export const centerShortenLongString = (string, maxLength) => {
	if(typeof string === 'string') {
		if(string.length > maxLength) {
			let charCountForRemoval = string.length - maxLength;
			let stringHalfwayPoint = Math.floor(maxLength/2);
			string = string.slice(0, stringHalfwayPoint) + "..." + string.slice(stringHalfwayPoint + charCountForRemoval, string.length);
			return string;
		}else{
			return string;
		}
	}else{
		return '';
	}
}

export const percentageOf = (value, whole) => {
	const result = BigNumber(value).multipliedBy(100).dividedBy(BigNumber(whole)).toNumber();
	if(Number.isNaN(result)){
		return 0;
	}
	return result;
	
}

export const dispatchHideModal = () => {
	store.dispatch(setModalConfig({
		show: false,
	}));
}

export const dispatchSetModalConfig = ({show, disableBackdropClick, stage, substituteValue1, substituteValue2}) => {
	let configToDispatch = Object.assign({}, {show, disableBackdropClick, stage, substituteValue1, substituteValue2});
	for(let key in configToDispatch) {
		if(typeof configToDispatch[key] === "undefined"){
			delete configToDispatch[key];
		}
	}
	store.dispatch(setModalConfig(configToDispatch));
}

export const openSetPledgeRevocationModal = (fundId) => {
	dispatchSetModalConfig({
		stage: "signal_donation_revocation_setting",
		substituteValue1: fundId,
		substituteValue2: 0,
		show: true,
	});
}

export const openSetFundMilestoneModal = (fundId) => {
	dispatchSetModalConfig({
		stage: "fund_milestone_setting",
		substituteValue1: fundId,
		show: true,
	});
}

export const getApproxBase64FileSizeMegaBytes = (length, endsWithDoubleEquals) => {
	// endsWithDoubleEquals is a boolean which declares whether or not the last two characters of the string are ==
	let y = 1;
	if(endsWithDoubleEquals) {
		y = 2;
	}
	return BigNumber(length).multipliedBy(BigNumber(3).dividedBy(4)).minus(y).dividedBy(1000000).toNumber();
}

export const stringToUrlSlug = (str) => {
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();
  
	// remove accents, swap ñ for n, etc
	const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
	const to   = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
	for (let i=0, l=from.length ; i<l ; i++) {
	  str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}
  
	str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
	  .replace(/\s+/g, '-') // collapse whitespace and replace by -
	  .replace(/-+/g, '-'); // collapse dashes
  
	return str;
  };

  // Credit for percToColour: https://gist.github.com/mlocati/7210513
  export const percToColor = (perc) => {
	if(perc > 100){
		perc = 100;
	}
	let r, g, b = 0;
	if(perc < 50) {
		r = 255;
		g = Math.round(5.1 * perc);
	}
	else {
		g = 255;
		r = Math.round(510 - 5.10 * perc);
	}
	let h = r * 0x10000 + g * 0x100 + b * 0x1;
	return '#' + ('000000' + h.toString(16)).slice(-6);
}