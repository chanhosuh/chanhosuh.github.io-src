Title: 12 coins problem  
Date: February 8, 2016  
Modified: May 13, 2018  
Category: brainteasers, interview questions, information theory  
Status: draft  


You are given 12 coins that look identical and a pair of scales.
One of the coins is fake and has a different weight than the
others.  Your challenge is to use the scales at most three times
to determine the fake coin and whether it is light or heavier
than a real coin.  You can weigh any group of coins against another
using the scales to see which is heavier or if they balance, but
you cannot measure the actual weights of the coins.

I'd run across this problem in interview brainteaser collections
but always found it mysterious: why 12 coins?  And how does this
work out so beautifully?

It turns out there is a nice way to think about it from the 
viewpoint of information theory.  In information theory, information
is measured in *bits*, and your ability to learn is limited by the
amount of information available.  

In our problem, the system we are learning about consists of 12 coins,
with one being fake.  Since the fake coin can be one of 12 coins and
the fake coin can have two states, light or heavy, there are 24
possible states of the system.

Each weighing gives one of three results (left side is heavier, 
right side is heavier, both sides balance), a *trinary* "bit" of 
information (called a **trit**).  Since there are three weighings, 
our entire weighing process gives us three trits of information.
In other words, we have 3^3 (=27) possible outcomes from our weighing
process.

Now we can see why *three* weighings are used in the problem.  Two 
would have been impossible.  That would result in only 3^2 (=9) 
outcomes, and we have 24 possible states.  There is no way we can 
"invert" our process and deduce which state we started with.  With 
three weighings, we have a chance, and four, we might guess makes 
the problem too easy.  

At this point, it helps to think more formally about the problem.
Our weighing process with the three weighings are effectively an
encoding scheme that codes the starting state of the system into
a three letter codeword in the alphabet {O, L, R}.  "O" means 
the two sides balance, "L" means the left side is heavier, and "R"
means the right side is heavier.

As we noted before, there are 27 possible codewords.  In order to
find a solution the problem, we must be able to invert the encoding
("decode uniquely") to obtain the starting state.  Invertibility
imposes conditions.  For example, if two coins are always either off
the scale or on the same side of a scale, there is no way to
distinguish the states where one coin is fake from the other being
fake.  In other words, in order to distinguish each starting state
from another, we need to make sure no two coins follow each other
around in our placement of the coins.

In fact we need more than that.  We need to make sure no two coins
mirror each other's movements; if two coins are always on opposite
sides of one another, there is no way to distinguish which is the fake,
as we don't know if the fake is heavy or light.

The code we are constructing uses the alphabet { O, R, L } with
each word being three letters, i.e. ORL, LLR, ROO...

The code must satisfy the following four conditions:

    1. It does not contain OOO
    2. It does not contain a pair of words that are reflections
       of each other, e.g. LRR is the reflection of RLL, OLO is
       the reflection of ORO, etc.
    3. For each position 1-3, there are equal numbers of L's and
       R's.

Any such code determines a method of placing coins on the
scales in the three weighings: we assign a coin to each codeword,
e.g. coin #1 assigned to ORR.

The letters give the location of the coin for each weighing:
    - O means "off the scale"
    - L means "on the left side of the scale"
    - R means "on the right side of the scale"

So coin #1 will be off the scale, then on the left side, and
finally on the right side for the three weighings.

The above conditions on the code then imply that our placement
method satisfies the following:

    1. Every coin is placed on the scale for at least one
       weighing.
    2. No two coins are placed at the same location for every
       weighing.
    3. No two coins are placed on opposite sides and taken off
       the scale together for every weighing.
    4. Each weighing places the same number of coins on each
       side of the scale.

Now suppose we do the three weighings according to our placement
method.

For example, we might get OLL.  This means the first weighing
balanced the sides. In particular, the fake coin is off the scale.
The second weighing pushed down the left side.  This means that
(assuming the fake is heavier) the fake coin was on the left side
of the scale.  The last weighing did the same, so the fake coin
was again on the left side.  If the fake is lighter, then the
conclusion is it was on the right sides for the last two weighings.

Whether the fake is heavier or lighter, it's clear the three
weighings give a codeword which then corresponds exactly to the
coin which was placed according to the codeword (or its reflection).

The above method of using codewords may appear mysterious at first
glance, but follows entirely naturally from an information-theoretic
viewpoint.

These conditions on how the coins can be placed lead to the above
conditions on the codewords.  In particular, in order for there to be
enough codewords to cover the 24 system states (and keeping in mind
that we place the same number on each side of the scale) we must place
four coins on each side of the scale at each weighing.  Any less and
there wouldn't be enough codewords.  And there are not enough codewords
to allow 5 or more to be weighed on each side (given the first letter,
there are only 9 words starting with R, and 9 starting with L, half of
them are reflections and not allowed, so we really only have 9 allowable
words to determine which coins get placed on a scale, but only an even
number of coins can be placed on the scale (half on each side), so the
most we can have is 4 on each side at a time.

So from an information theoretic viewpoint, we see very clearly why we
must divide up the 12 coins into three groups of four, something which
may strike us as very mysterious when using trial-and-error to derive
the solution!

Another nice thing about viewing the problem this way, is it lets us
generalize to more coins and more weighings.  If we allow four weighings,
what's the largest number of coins for which we can determine the fake
coin?  With three weighings, we saw that 12 is the optimal number.
Anymore, and we simplywould not have enough codewords.

For four weighings, we have 3^4 = 81 possible codewords.  As before
OOOO is not allowed, so that leaves us with 80 possibilities.  Again,
there are 40 reflection pairs, so we can have at most 40 coins.  Note
that 27 codewords (modulo reflections) are allowed for coins being
placed on the scale, and 13 for off the scale.  Again the restriction
that we allow only equal numbers to be placed on each side of the scale
means that 13 is the largest that can be placed on each side.  So we
have 26 coins being placed on a scale at once and that leaves 13 for
off the scale, for a total of 39 coins.

Going through this reasoning more rigorously and keeping track of the
arithmetic, we conclude that the number of coins can be at most
(3^n - 3) / 2 where n is the number of weighings.

    - n = 3,  # coins = 12
    - n = 4,  # coins = 39
    - n = 5,  # coins = 120
    - etc..



