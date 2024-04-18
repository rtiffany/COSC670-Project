# Changes to Hardhat Project

## Poll.sol
1. Removed owner only modifier in Poll.sol to allow for EOAs to transact with the contract.
2. Added a variable `name` that tracks the name of the poll that the election manager configures on the frontend.
3. Added 3 getters, one for each of the candidate struct's members. This was more so for testing purposes, I needed something to assert against for faster automated testing vs. just doing testing by printing to the console and manually inspecting the results.

## test/Poll.js
1. Wrote a testing suite that exercises every (maybe?) function in the smart contract to ensure function is returning correct results and working as intended.
2. Not sure, but think one of the functions isn't working as intended unless there is a misunderstanding about its function.

# Changes to Client 

## src/artifacts
1. Added a json file containing the deployed contract's address on the Sepolia network, needed in our frontend code to transact with it on chain.
2. Added a json file containing the smart contract ABI to access from frontend source code.

## src/components
1. Kept same structure of directory but added 2 new reusable components: InputWithLable and LinkButton. They exist primarily for navigation purposes.
2. Removed App component and placed navigation logic with React Router inside main.jsx.

## src/routes
1. Created this new directory that contains the components that represent the "pages" of our application. This is keeps the "pages" organized in one colocation.
2. Having a separate routes and components directory separates components that are "pages" vs. components that are simply reusable interface elements.

## main.jsx 
1. Moved all the React Router code into main.jsx to serve at the primary location of the router object. This keeps each route and its corresponding element representing the page w/its URL segment in one location for access.

I think those are all the primary changes, the rest is just updating some source code in the frontend to include the code allowing interaction with the Metamask extension and signing transactions. 

I didn't do much with the UI, the theme and the CSS is the same, only added some padding on the configure poll page to the buttons to make it easier for me to see while developing the page. 
