/* Task Description */
/* 
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number	

*/
function solve() {

	return function sum(arr) {
        var array=[].concat(arr);
        var len=array.length;
        var sum=0;

        if(len===0){
            return null;
        }

        if(arr===null){
            throw Error;
        }

        for(var i=0;i<len;i+=1){
            if(!(+array[i])||array[i]===NaN||array[i]===undefined){
                throw Error;
            }

            sum+=+array[i];
        }
console.log(sum);
        return sum;

	}
}
//module.exports = sum;
solve()(['1','2','4']);