import { MDBInput } from 'mdb-react-ui-kit';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function NewCareerModal({handleCancel, handleSave, show}) {

    const [newCareer, setNewCareer] = useState(''),
        [error, setError] = useState(false)


  
    return (
        <Modal show={show} onHide={handleCancel} backdrop="static" keyboard={false}>
          <Modal.Header className='bg-primary text-white' closeVariant='white' closeButton>
            <Modal.Title>Agregar nueva profesion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MDBInput label="Nueva profesión" className={error && 'border-1 border-danger'} value={newCareer} onChange={e => {
                setNewCareer(e.target.value);
                setError(false)
            }}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCancel}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={e => {
                    if (newCareer.trim().length > 0) {
                        handleSave(newCareer)
                        setNewCareer('')
                    }else {
                        setError(true)
                    }
                }}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }
  
  export default NewCareerModal;