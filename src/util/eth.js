
const LOGGER=console.log
const istwoaddressessame=( str0,str1 )=>{ LOGGER( `@istwoaddressessame` , str0,str1 )
	if( str0 && str1 ){}
	else {return null }
	return str0.toLowerCase() == str1.toLowerCase()
}
export { istwoaddressessame }
