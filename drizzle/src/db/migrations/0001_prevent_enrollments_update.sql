CREATE OR REPLACE FUNCTION prevent_enrollments_batch_id_update()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.batch_id IS DISTINCT FROM NEW.batch_id THEN
        RAISE EXCEPTION 'batch_id cannot be updated';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION prevent_enrollments_student_id_update()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.student_id IS DISTINCT FROM NEW.student_id THEN
        RAISE EXCEPTION 'student_id cannot be updated';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_enrollments_batch_id_update_trigger
BEFORE UPDATE ON enrollments
FOR EACH ROW
EXECUTE FUNCTION prevent_enrollments_batch_id_update();

CREATE TRIGGER prevent_enrollments_student_id_update_trigger
BEFORE UPDATE ON enrollments
FOR EACH ROW
EXECUTE FUNCTION prevent_enrollments_student_id_update();
