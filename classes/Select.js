/// <reference path="../moreFunctions/jquery-3.6.0.js"/>

class Select {
    static selected = [];
    static selectedSym = [];

    /**
     * @param {Array} data coins from the api coingecko
     * 
     * Starts an event that happenes when one of the class ".checkbox" changes.
     * If it is not checked the fitting id will be removed from the array Select.selected.
     * If it is checked the fitting id goes into Select.selected array.
     * If after the change the array Select.selected has more than 5 items a modal is being showed with
     * the array and an abilty to remove one of them.
     */
    static selectValidation(data) {
        $(".checkbox").on("change", function () {
            if (!this.checked){
                Select.selected.splice(Select.selected.indexOf(this.id, 0), 1);
                Select.selectedSym.splice(Select.selectedSym.indexOf(data[this.id.substring(4)].symbol, 0), 1);
            }
            else{
                Select.selected.push(this.id);
                Select.selectedSym.push(data[this.id.substring(4)].symbol);
            }

            if (Select.selected.length > 5) {
                $("#modal-body").html("");
                for (let s in Select.selected)
                    $("#modal-body").append(`
                    <div class="remove"> 
                        <button type="checkbox" onclick="Select.modalRemove('${Select.selected[s]}')"
                        class="btn btn-warning remove" data-bs-dismiss="modal"> X </button>
                        <span class="selected"> ${data[Select.selected[s].substring(4)].symbol} </span>
                    </div>
                    `);
                $("#showModal").modal('toggle');
            }
        })
    }

    /**
     * @param {string} id coin number
     * 
     * takes the argument of id and uncheckes it. 
     */
    static modalRemove(id) {
        $(`#${id}`).prop('checked', false).trigger('change');
    }
}