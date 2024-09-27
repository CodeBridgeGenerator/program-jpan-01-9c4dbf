import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const NotifyCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [tajuk, setTajuk] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount latihan
                    client
                        .service("latihan")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleLatihanId } })
                        .then((res) => {
                            setTajuk(res.data.map((e) => { return { name: e['tajuk'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Latihan", type: "error", message: error.message || "Failed get latihan" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            tajuk: _entity?.tajuk?._id,
venue: _entity?.venue,
tarikh: _entity?.tarikh,
penganjur: _entity?.penganjur,
        };

        setLoading(true);
        try {
            
        await client.service("notify").patch(_entity._id, _data);
        const eagerResult = await client
            .service("notify")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "tajuk",
                    service : "latihan",
                    select:["tajuk"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info notify updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const tajukOptions = tajuk.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Notify" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="notify-edit-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="tajuk">Tajuk:</label>
            <Dropdown id="tajuk" value={_entity?.tajuk?._id} optionLabel="name" optionValue="value" options={tajukOptions} onChange={(e) => setValByKey("tajuk", {_id : e.value})}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="venue">Venue:</label>
            <InputText id="venue" className="w-full mb-3 p-inputtext-sm" value={_entity?.venue} onChange={(e) => setValByKey("venue", e.target.value)}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="tarikh">Tarikh:</label>
            <Calendar id="tarikh" value={_entity?.tarikh ? new Date(_entity?.tarikh) : new Date()} onChange={ (e) => setValByKey("tarikh", new Date(e.target.value))} showIcon showButtonBar  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="penganjur">Penganjur:</label>
            <InputText id="penganjur" className="w-full mb-3 p-inputtext-sm" value={_entity?.penganjur} onChange={(e) => setValByKey("penganjur", e.target.value)}  />
        </span>
        </div>
                <div className="col-12">&nbsp;</div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="created At:"></Tag>{" " + moment(_entity?.createdAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="created By:"></Tag>{" " +_entity?.createdBy?.name}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="last Updated At:"></Tag>{" " + moment(_entity?.updatedAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="last Updated By:"></Tag>{" " +_entity?.updatedBy?.name}</p></div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(NotifyCreateDialogComponent);
