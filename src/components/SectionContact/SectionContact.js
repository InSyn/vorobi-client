import styles from "./SectionContact.module.css";
// import Schema from "./Schema.png";
import Location from "./Location.png";
import { Formik } from "formik";
import axios from "axios";
import { SERVER_ADDRESS } from "../../constants";

function SectionContact() {
  return (
    <section className={styles.Section} id="contacts">
      <div className={styles.Left}>
        <div className={styles.Title}>КОНТАКТЫ</div>
        <div className={styles.LeftContent}>
          <div className={styles.Address}>
            <div className={styles.AddressItem}>
              <div className={styles.AddressName}>Адрес:</div>
              <div className={styles.AddressValue}>
                Красноярский край, п. Подгорный, ул. Черемуховая
              </div>
            </div>
            <div className={styles.AddressItem}>
              <div className={styles.AddressName}>Телефон:</div>
              <div className={styles.AddressValue}>+7 913 172 97 92</div>
            </div>
            <div className={styles.AddressItem}>
              <div className={styles.AddressName}>E-mail:</div>
              <div className={styles.AddressValue}>info@vorobi.ski</div>
            </div>
            <div className={styles.AddressItem}>
              <div className={styles.AddressName}>Как проехать:</div>
              <div className={styles.AddressImg}>
                <iframe
                    className={styles.LocationYaMap}
                    title="YaLocation"
                    src="https://yandex.uz/map-widget/v1/?ll=93.442,56.1174&mode=search&oid=213765788301&ol=biz&source=mapframe&utm_source=mapframe&z=15"
                    width="100%"
                    height="275"
                >
                </iframe>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.Coords}>
          <div className={styles.CoordsData}>
            <div className={styles.CoordsX}>56.117347</div>
            <div className={styles.CoordsY}>93.441942</div>
          </div>
          <div className={styles.CoordsIcon}>
            <img src={Location} alt="Location" />
          </div>
        </div>
      </div>
      <div className={styles.Right}>
        <div className={styles.FormTitle}>ОБРАТНАЯ СВЯЗЬ</div>
        <Formik
          initialValues={{
            name: "",
            company: "",
            phone: "",
            email: "",
            message: "",
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(false);

            const formResponse = (
              await axios.post(`${SERVER_ADDRESS}/mail-message`, values)
            ).data;

            if (!formResponse.ok) {
              alert("Произошла непредвиденная ошибка");
            } else {
              resetForm();
            }
          }}
        >
          {({ handleSubmit, values, handleChange, errors }) => (
            <form onSubmit={handleSubmit}>
              <input
                className={styles.Input}
                placeholder="Имя"
                name="name"
                value={values.name}
                onChange={handleChange}
                required
              />
              <input
                className={styles.Input}
                placeholder="Организация"
                name="company"
                value={values.company}
                onChange={handleChange}
                required
              />
              <input
                className={styles.Input}
                placeholder="Телефон"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                required
                type="tel"
              />
              <input
                className={styles.Input}
                placeholder="E-mail"
                name="email"
                value={values.email}
                onChange={handleChange}
                required
                type="email"
              />
              <textarea
                className={styles.Textarea}
                placeholder="Сообщение"
                name="message"
                required
                value={values.message}
                onChange={handleChange}
              ></textarea>
              <div className={styles.Btn}>
                <button
                  className={styles.Button}
                  type="submit"
                  disabled={false}
                >
                  ОТПРАВИТЬ
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default SectionContact;
