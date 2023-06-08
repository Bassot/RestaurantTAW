import mongoose = require('mongoose');

export interface Table extends mongoose.Document {
    readonly _id: mongoose.Schema.Types.ObjectId,

    number: number,
    total_seats: number,
    free_seats: number,
    orders: [{ order: mongoose.Schema.Types.ObjectId}],
    bill: number,
    isFree: ()=>boolean,
    takeSeat: ()=>void,
    freeSeat: ()=>void
}

var userSchema = new mongoose.Schema<Table>( {
    number: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    total_seats: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    free_seats: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    orders: [
        {
            order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
        }
    ],
    bill: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
})

userSchema.methods.isFree = function(): boolean {
    return this.state == "Free";
}

userSchema.methods.takeSeat = function(): void {
    if(this.free_seats>0){
        this.free_seats--;
    }
    if(this.total_seats!=this.free_seats){
        this.isFree = false;
    }
}

userSchema.methods.freeSeat = function(): void {
    if(this.free_seats<this.total_seats){
        this.free_seats++;
    }
    if(this.total_seats==this.free_seats){
        this.isFree = true;
    }
}




export function getSchema() { return userSchema; }



// Mongoose Model
var tableModel : any;  // This is not exposed outside the model
export function getModel() : mongoose.Model< Table >  { // Return Model as singleton
    if( !tableModel ) {
        /*Nel metodo model(), non importa se si passa un nome maiuscolo al singolare, la collezione nel db
         *viene creata sempre in minuscolo al plurale. Tipo 'User'->users.
         */
        tableModel = mongoose.model('Table', getSchema() )
    }
    return tableModel;
}

export function newTable( data: any ): Table {
    var _tablemodel = getModel();
    return new _tablemodel(data);
}
