/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = []; //fixme
  let count = 0; //piece on the board
  //create  with matrix
  let chessboard = new Board({'n': n});
  let matrix = chessboard.rows();
  //loop over whole matrix (two for loops)
  let possibilityChecker = function(matrix) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (matrix[i][j] === 1) {
          continue;
        }
        // if board already ahs 1 there, skip this loop isntance
        if (matrix[i][j] !== 1) {
          chessboard.togglePiece(i, j);
        }
        // if board has no 1 there, try changing the value to 1
        if (chessboard.hasAnyRooksConflicts() === false) {
          // if after changing value to 1, the board has no conflicts
          count++;
          //increase count
          if (count === n) {
            // once you
            solution.push(matrix);
          }
          if (count < n) {
            possibilityChecker(chessboard.rows());
          }
        }
        if (chessboard.hasAnyRooksConflicts()) {
          chessboard.togglePiece(i, j);
        }
      }
    }
  };
  possibilityChecker(matrix);
  console.log(solution);
  // change values inside for loop
  //recursing this function only n times
  //recuse function (matrix with updated piece)
  //
  //if matrix has n number of 1s, & no conflicts, push to solution
  //return (next recursion)
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution[0];
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount;
  var solution = []; //fixme
  // let count = 0;
  //create  with matrix
  let chessboard = new Board({'n': n});
  console.log(chessboard);
  let matrix = chessboard.rows();
  //loop over whole matrix (two for loops)
  let possibilityChecker = function(chessboard, matrix, count) {

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        // if (matrix[i][j] === 1) {
        //   continue;
        // }
        if (matrix[i][j] !== 1) {
          chessboard.togglePiece(i, j);
          // console.log('if the initial value had 0 to toggle 1', matrix);
        }
        if (chessboard.hasAnyRooksConflicts()) {
          // console.log('if the matrix has conflict', matrix);
          chessboard.togglePiece(i, j);
        } else {
          count++;
          if (count < n) {
            possibilityChecker(chessboard, matrix, count);
            chessboard.togglePiece(i, j);
            count--;
          }
          if (count === n) {
            solution.push(matrix);
            if (_.flatten(matrix).filter(function(element) {return element === 1}).length === 3
            ) {
              chessboard.togglePiece(i, j);
              count--;
            }
          }

        }

      }
    }
  };
  possibilityChecker(chessboard, matrix, 0);
  // console.log('solutionbefore splice', solution);
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  for (let k = 0; k < solution.length; k++) {
    if (_.isEqual(solution[k], solution[k + 1])) {
      solution.splice(k + 1, 1);
    }
  }
  console.log('solutions after splice', solution);
  solutionCount = solution.length;
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var solution = []; //fixme
  let count = 0; //piece on the board
  //create  with matrix
  let chessboard = new Board({'n': n});
  let matrix = chessboard.rows();
  //loop over whole matrix (two for loops)
  let possibilityChecker = function(matrix) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (matrix[i][j] === 1) {
          continue;
        }
        // if board already ahs 1 there, skip this loop isntance
        if (matrix[i][j] !== 1) {
          chessboard.togglePiece(i, j);
        }
        // if board has no 1 there, try changing the value to 1
        if (chessboard.hasAnyQueensConflicts() === false) {
          // if after changing value to 1, the board has no conflicts
          count++;
          //increase count
          if (count === n) {
            // once you
            solution.push(matrix);
          }
          if (count < n) {
            possibilityChecker(chessboard.rows());
          }
        }
        if (chessboard.hasAnyQueensConflicts()) {
          chessboard.togglePiece(i, j);
        }
      }
    }
  };
  possibilityChecker(matrix);
  console.log(solution);
  // change values inside for loop
  //recursing this function only n times
  //recuse function (matrix with updated piece)
  //
  //if matrix has n number of 1s, & no conflicts, push to solution
  //return (next recursion)
  if (solution.length === 0 ) {
    solution = 0;
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};



// /// >>>> NAT PART <<<<<<<<<
// window.countNRooksSolutions = function(n) {
//   var solutionCount;
//   const boardSize = n;
//   const solution = []; //<< this function return length of solution.length
//   let board = new Board({'n': boardSize});
//    //not sure if  I  can use const
//   // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   // return solution;
//   //>>>> START HERE
//   const checkAvailableSpot = function (currentBoard) { //take matrixas argument
//     for (let row = 0; row < boardSize; row++) {
//       let currentRow = currentBoard.get(row);//CURRENT ROW
//       if (currentRow.indexOf(1) !== -1) {
//         continue;
//       }
//       //ROW WITH NO piece >>  |0|0|0|0|
//       //loop over each column for loop with i
//         //IN THE LOOP >>
//         // check by going to that column on each row of the board  >>
//       for (let colIndex = 0; colIndex < boardSize; colIndex++) { // loop over each column at CURRENT ROW
//         if (board.rows().every(row => row[colIndex] === 0) ) { //MATRIX
//           board.togglePiece(row, colIndex);
//           return board;
//         }
//       }
//     } return null;
//   };


//   // loop over row MAIN LOOP
//   let countPiece = 0; //DONT FORGOT TO UPDATE IT BACK TO ZERO AFTER RETURN
//   for (let row = 0; row < n; row++) {//MAIN BOARD (REAL BOARD)
//     let currentRow = board.get(row);
//     for (let col = 0; col < n; col++) { // at CURRENT ROW
//       board.togglePiece(row, col); // >> @ ROW 0 >>|0|1|0|0|
//       countPiece++; //updated no piece
//       while (countPiece < n) {
//         let updatedBoard = checkAvailableSpot(board);
//         if (updatedBoard) { // <<< RETURN UPDATE BOARD FROM HELPER
//           //has a new piece on
//           countPiece++;
//           board = updatedBoard; //[[arr4], arr4],[arr4]] = [[arr4], arr4],[arr4]]
//           if (countPiece === n) { // It's going to leave while loop NOW
//             //check before push it in solution >> [push board.rows()] >> HOW TO CHECK ? JSONStringify?
//             console.log('solution>>', solution);
//             console.log(board.rows());
//             if (solution.every(el => (JSON.stringify(el) !== JSON.stringify(board.rows())) === true )) { // no duplicated
//               solution.push(board.rows());
//               board.rows().forEach(el => el.fill(0)); // make it empty >> it is leaving while loop
//               countPiece = 0;
//             }
//           }
//         } else { // return null from helper func
//           board.rows().forEach(el => el.fill(0));
//           countPiece = 0;
//           break;
//         }
//       } //END while loop here
//     } //finishing current row
//   }
//   solutionCount = solution.length;
//   return solutionCount;


// };