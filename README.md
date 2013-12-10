
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
jekyll --serve
</pre>

Jekyll is now running and you should be able to navigate to the following URL to view the website...

<pre>
http://localhost:4000
</pre>

When you make changes to files these will automatically be updated, so it's nice and easy to develop.  _But_ you will need to restart Jekyll when you add new files.

## Meetup integration

The data for the latest event and the attendees gets pulled in automatically from meetup.com through our simple proxy. The relevant endpoints being

**Events**
`http://unified-diff.marvelley.com/events.json`

**Attendees**
`http://unified-diff.marvelley.com/rsvps/{event_id}.json`

If you need to make changes to this at all, you can do so on the repository for the proxy:
https://github.com/unified-diff/unified-diff-meetup-proxy
