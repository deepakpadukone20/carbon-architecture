The Challenge

A team are meeting for a catch-up in the office, hopefully doing some fun challenges, but it's making us hungry.

We want to order some food via JustEat for delivery to the office and we need you to write a small program or script for us that will find some restaurants and provide some information on each.

The program can be written in any language you like and can either be a script or a compiled binary - a single python or nodejs script for example is perfectly acceptable.

It should take as its sole input the partial postcode of the office location, namely 'TW12'.

JustEat exposes a public REST api endpoint at :
   
    https://uk.api.just-eat.io/restaurants/bypostcode/{postcode}

If you provide a partial postcode as the final term in the url, this supplies a list of local restaurants in its response in JSON format.
You can actually retrieve these results from the Windows Powershell command-line or Linux/OS-X terminal using either curl or wget. For example:

    curl https://uk.api.just-eat.io/restaurants/bypostcode/tw12 -o out.txt

This command simply pipes the output to the file 'out.txt' in the directory from which the script is run. If you do that first it'll give you an idea of the contents. It's a big file but if you open it in a viewer that prettifies the content the structure isn't actually that complex.

Once you've done this you should call this api endpoint in your program using the appropriate language constructs for reading REST apis and then perform some filtering on the results. The program should check any status code that is returned and, if it's not 200, communicate a suitable error message to the user.

If the response is successful there are three filters I'd like you to try applying to the results, examining the 'Restaurants' node of the document.

As a starting point :
  - the restaurant should have an average rating greater than 4.5 and have received at least 100 ratings (1)

If you're ok extracting that
 - the upper limit of the eta for delivery should not exceed 45 minutes (2)
 - the cuisines should include 'Pizza' (3)

Finally, for the restaurants that pass these filters, we need just three pieces of information :
 - the restaurant name
 - the JustEat url
 - the first-line and partial postcode of its address
 
You can choose how the program supplies/displays these results.


