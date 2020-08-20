import React from 'react';
import ReactDOM from 'react-dom';

function New() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Test Component</div>

                        <div className="card-body">I'm an test component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default New;

if (document.getElementById('test')) {
    ReactDOM.render(<New />, document.getElementById('test'));
}
