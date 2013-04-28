
# Unified Diff

Source code for the Unified Diff website.

## Hacking

The site is built with Jekyll, and deployed via Github Pages.  You can install
Jekyll by running...

<pre>
gem install jekyll --no-rdoc --no-ri
</pre>

Then after cloning the repo, change to the folder and start the Jekyll server...

<pre>
jekyll --server
</pre>

Jekyll is now running and you should be able to navigate to the following URL to view the website...

<pre>
http://0.0.0.0:4000
</pre>

When you make changes to files these will automatically be updated, so it's nice and easy to develop.  _But_ you will need to restart Jekyll when you add new files.

## New 'u tendin

Every month we have to update the "u tendin'" section (I think it uses Parse https://www.parse.com/)

All you need do it update the meedupid to the new date:

Example:

             <div class="attendn"
    -             data-meetupid="ud20130306"
    +             data-meetupid="ud20130403"
                  data-parseappid="0zU3tXSe6hix0imtvBCXFPQMsljwglGl8WsYBrRe"
                  data-parserestkey="JQEcXQlTnHtlXcgkt8MTPy8JouLaavfR80DcaJSf"></div>
