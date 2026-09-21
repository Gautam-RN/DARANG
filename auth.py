from werkzeug.security import generate_password_hash, check_password_hash

from database import connect


# ==========================================
# REGISTER USER
# ==========================================

def register_user(full_name, email, password, role):

    conn = connect()

    if not conn:
        return False, "Database connection failed."

    cursor = None

    try:

        cursor = conn.cursor()

        # Check whether email already exists

        cursor.execute(
            """
            SELECT uid
            FROM users
            WHERE email = %s
            """,
            (email,)
        )

        existing_user = cursor.fetchone()

        if existing_user:
            return False, "An account with this email already exists."

        # Hash password

        password_hash = generate_password_hash(password)

        # Insert user

        cursor.execute(
            """
            INSERT INTO users
            (
                full_name,
                email,
                password_hash,
                role
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s
            )
            RETURNING uid
            """,
            (
                full_name,
                email,
                password_hash,
                role
            )
        )

        result = cursor.fetchone()

        if not result:
            conn.rollback()
            return False, "Failed to create user."

        uid = result[0]

        conn.commit()

        return True, uid

    except Exception as e:

        conn.rollback()

        return False, str(e)

    finally:

        if cursor:
            cursor.close()

        conn.close()


# ==========================================
# LOGIN USER
# ==========================================

def login_user(email, password):

    conn = connect()

    if not conn:
        return False, "Database connection failed."

    cursor = None

    try:

        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT
                uid,
                full_name,
                email,
                password_hash,
                role
            FROM users
            WHERE email = %s
            """,
            (email,)
        )

        user = cursor.fetchone()

        if not user:
            return False, "Invalid email or password."

        uid, full_name, email, password_hash, role = user

        # Verify password

        if not check_password_hash(password_hash, password):

            return False, "Invalid email or password."

        return True, {
            "uid": uid,
            "full_name": full_name,
            "email": email,
            "role": role
        }

    except Exception as e:

        return False, str(e)

    finally:

        if cursor:
            cursor.close()

        conn.close()