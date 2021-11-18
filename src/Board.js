// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      let haspieceonrow = false;
      for (let i = 0; i < rowIndex.length; i++) {
        if (rowIndex[i] === 1 && haspieceonrow === false) {
          haspieceonrow = true;
        } else if (rowIndex[i] === 1 && haspieceonrow === true) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (let key in this.rows()) {
        if (this.hasRowConflictAt(this.rows()[key])) {
          return true;
        }
      }
      // for (let i = 0; i < this.attributes.length; i++) {
      //   if (this.hasRowConflictAt(this[i])) {
      //     return true;
      //   }
      // }
      // console.log(this);
      // console.log(this[0]);
      // console.log(this[1]);
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let haspieceoncolumn = false;
      for (let key in this.rows()) {
        if (this.rows()[key][colIndex] === 1 && haspieceoncolumn === false) {
          haspieceoncolumn = true;
        } else if (this.rows()[key][colIndex] === 1 && haspieceoncolumn === true) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (let i = 0; i < this.get(0).length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      let haspieceondiagonal = false;
      //loop through the matrix
      let matrix = this.rows(); //[[ar(4)], [ar(4)], [ar(4)], [ar(4)] ]; [[1,2,3,4],[5,6,7,8],[],[]]
      // if (matrix[0] === 1) {
      //   haspieceondiagonal = true;
      // }
      for (let key in matrix) {
        for (let i = 0; i < matrix[key].length; i++) {
          if (this._getFirstRowColumnIndexForMajorDiagonalOn(key, i) === majorDiagonalColumnIndexAtFirstRow) {
            if (matrix[key][i] === 1 && haspieceondiagonal === false) {
              haspieceondiagonal = true;
            } else if (matrix[key][i] === 1 && haspieceondiagonal === true) {
              return true;
            }
          }
        }
      }
      //run getfirstrowcolumnbah on the individual col,row index
      //if the number for that is equal to the argument
      //retru ntrue;
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let matrix = this.rows();
      let num = this.get('n');

      for (let i = -num; i < num; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {

      let counter = 0;
      // loop over each row on a matrix
      for (let i = 0; i < this.get('n'); i++) {
        //now we are at at first row (get a row no.)
        let currentRow = this.get(i);
        // at row no.0 >> loop over the row [index]
        for (let j = 0; j < this.get('n'); j++) {
          if (this._getFirstRowColumnIndexForMinorDiagonalOn(i, j) === minorDiagonalColumnIndexAtFirstRow ) {
            if (currentRow[j] === 1) {
              counter++;
              if (counter > 1) {
                return true;
              }
            }

          }
        }
      } return false;
    },

      // let haspieceondiagonal = false;
      // //loop through the matrix
      // let matrix = this.rows(); //[[ar(4)], [ar(4)], [ar(4)], [ar(4)] ]; [[1,2,3,4],[5,6,7,8],[],[]]
      // // if (matrix[0] === 1) {
      // //   haspieceondiagonal = true;
      // // }
      // for (let key in matrix) {
      //   for (let i = 0; i < matrix[key].length; i++) {
      //     if (this._getFirstRowColumnIndexForMinorDiagonalOn(key, i) === minorDiagonalColumnIndexAtFirstRow) {
      //       if (matrix[key][i] === 1 && haspieceondiagonal === false) {
      //         haspieceondiagonal = true;
      //       } else if (matrix[key][i] === 1 && haspieceondiagonal === true) {
      //         return true;
      //       }
      //     }
      //   }
      // }
      // //run getfirstrowcolumnbah on the individual col,row index
      // //if the number for that is equal to the argument
      // //retru ntrue;
      // return false;


    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let matrix = this.rows();
      let num = this.get('n');

      for (let i = 0; i < num * 2; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
