
var n = '0xccccccccc';

function noother_says_correct(input)
{
        var one = '1'.charCodeAt(0);
        var nine = '9'.charCodeAt(0);
        for (var i = 0; i < input.length; i++)
        {   
                var  digit = input.charCodeAt(i);
                if ( (digit >= one) && (digit <= nine) )
                {
                        return false;
                }
                console.log(digit);
        }

        if(input == 54975581388)
          console.log(input, 'is equals to 54975581388');
}

noother_says_correct(n);

