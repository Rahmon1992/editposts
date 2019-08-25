The SeatGeek Frontend Coding Test
===

Hello, and welcome to SeatGeek's frontend coding test, a verifiable way to add some delight to your day!

In this challenge you'll be tasked with undertaking some development work on a personal blogging utility called Chairnerd after our [actual company blog](http://chairnerd.seatgeek.com/). We're looking primarily at your ability to work with an existing framework by developing new features within it.


Playing around with Chairnerd
===

Chairnerd is built with Webpack. To get it up and running, ensure that you have `node` and `npm` available on your machine, and then run `npm install` from the root. Next, run `npm start` to start the Chairnerd local server. Chairnerd should now be up and running on `http://localhost:3000`!

Note that the data you store in Chairnerd is designed to persist across multiple sessions. Add a post and refresh the page to see this in action.


Tasks
===

Chairnerd is in a rather desperate state right now. Let us make Chairnerd more useful by adding two new features to it.

1. Deleting Posts
We would like to be able to delete posts after they are added. Each post should have a delete button somewhere within each post that deletes it from both the view and the storage layer.


2. An Undo Button
Unfortunately, with the ability to delete posts we now might accidentally remove a post that contains some treasured memories. To fix this, add an undo button that is able to undo both addition and deletion of posts. For example, if I add a post and delete a post and press undo twice, the added post should be removed and the deleted post should be restored. The ordering of the posts before and after the undo **must** be preserved. If I add *x* posts and press undo *x* times, then *x* posts should be deleted.

You only need to be able to undo actions taken within a browser session; if you delete a post and close the window, it is all right if that post is gone forever.

Please approach this project as one would a real production website. Consideration will be given for code quality, edge cases, and attention to detail in the user interface.


Version Control
===

Please keep a history of your changes to the project in Git. However, please do **not** upload your code to GitHub - we don't want people to be able to cheat, do we?


Restrictions
===

In completing this task, you must observe the following restriction: the **only** external libraries you may use are those that deal with the manipulation of data strucures. You may include a library that does more than that, but only if you limit your use of it to the manipulation of data structures. Examples of acceptable libraries are lodash or mori. An example of a mostly unacceptable library is jQuery, because it deals directly with DOM manipulation. You may, however, use `jQuery.extend` if you choose. You may not use frameworks such as Backbone, Angular, or React.


Privacy
===

You should not make the contents of this challenge, in whole on in part, available to the public, or grant access to it to any person other than yourself. Please package everything in a zip file, solution and readme, and submit it via the greenhouse link. To avoid unconscious bias while we review your code solution, please refrain from adding your name within the readme or in the file name.
