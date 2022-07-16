import { useEffect, useState, useContext } from "react";
import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import Title from "@components/common/Title";
import GoBackButton from "@components/common/GoBackButton";
import { getTeacherById } from "src/data/queryTeachers";
import SchoolIcon from "@assets/icons/school.svg";
import ReviewAvgTeacher from "./components/ReviewAvgTeacher";
import ReviewTeacherForm from "./components/ReviewTeacherForm";
import { AuthContext } from "src/contexts/AuthContext";
import Button from "@components/common/Button";
import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import { getTeacherReviewsWithPagination } from "src/data/queryTeachersReviews";
import InfiniteScroll from "react-infinite-scroll-component";
import Review from "@components/Review";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import useIsMounted from "@hooks/useIsMounted";
import Tag from "@components/common/Tag";
import A from "@components/common/A";
import { SCHOOL_READ_PATH } from "src/paths";

const ShowTeacher = () => {
  const router = useRouter();
  const { id } = router.query;
  const [teacher, setTeacher] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [subjectsTags, setSubjectsTags] = useState([]);
  const { isMounted } = useIsMounted();

  const { currentUser } = useContext(AuthContext);

  const { items, startFrom, count, reloadData, nextPage } =
    useInfiniteScrolling({
      query: getTeacherReviewsWithPagination,
      queryData: teacher,
      perPage: 10,
    });

  useEffect(() => {
    const getData = async () => {
      const result = await getTeacherById(id);

      setSubjectsTags(await result.attributes.subjects.query().find());
      setTeacher(result);
      setIsLoading(false);
    };

    getData();
  }, [id]);

  return (
    <FlexColumn>
      {!isLoading && (
        <>
          <FlexRow alignItems="center">
            <GoBackButton />
            <FlexColumn>
              <Title text={teacher.attributes.name} />
            </FlexColumn>
          </FlexRow>
          <FlexColumn>
            <FlexRow>
              <SchoolIcon width="25px" height="25px" />
              <A
                href={SCHOOL_READ_PATH.replace(
                  ":school",
                  teacher.attributes.school.attributes.slug
                )}
              >
                <Title
                  margin="0px 0px 0px 10px"
                  text={teacher.attributes.school.attributes.name}
                  typeStyle="secondary"
                />
              </A>
            </FlexRow>
            <FlexRow margin={"15px 0px 0px 0px"}>
              {subjectsTags.map((subject) => (
                <FlexRow margin="0px 5px 0px 0px">
                  <Tag key={subject.id} text={subject.attributes.name} />
                </FlexRow>
              ))}
            </FlexRow>
            <FlexRow className={styles.topHeader}>
              <FlexColumn className={styles.avgContainer}>
                <ReviewAvgTeacher teacher={teacher} />
              </FlexColumn>
              <FlexColumn margin={5} className={styles.formContainer}>
                {isMounted && currentUser ? (
                  <ReviewTeacherForm
                    teacher={teacher}
                    reloadData={reloadData}
                  />
                ) : (
                  <FlexRow>
                    <Button>Inicia Sesion para dejar tu opinion</Button>
                  </FlexRow>
                )}
              </FlexColumn>
            </FlexRow>

            <InfiniteScroll
              dataLength={items.length}
              loader={"Cargando"}
              hasMore={startFrom < count}
              next={nextPage}
              className={styles.reviewsContainer}
            >
              {items.map((item) => (
                <Review
                  text={item.attributes.description}
                  date={item.attributes.createdAt}
                  rating={item.attributes.rating}
                  user={item.attributes.createdBy}
                />
              ))}
            </InfiniteScroll>
          </FlexColumn>
        </>
      )}
    </FlexColumn>
  );
};

export default ShowTeacher;
