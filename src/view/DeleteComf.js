const DeleteComf = (props) => {
    const { Text, Title } = props
    var modal = document.getElementById('id01');
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    return (<>
        <div id="id01" class="modal">
            <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">×</span>
            <form class="modal-content" action="/action_page.php">
                <div class="container">
                    {Title && <h1>{Title}</h1>}
                    <p>{Text}</p>
                    <div class="clearfix">
                        <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
                        <button type="button" onclick="document.getElementById('id01').style.display='none'" class="deletebtn">Delete</button>
                    </div>
                </div>
            </form>
        </div>
    </>)
}
export default DeleteComf