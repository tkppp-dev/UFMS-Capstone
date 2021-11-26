package sj.sjesl.payload;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import sj.sjesl.dto.lab.LabResponseDto;
import sj.sjesl.entity.Lab;
import sj.sjesl.entity.Member;

import java.util.*;

@Component
public class Response {

    @Getter
    @Builder
    private static class Body {

        private int state;
        private String result;
        private String massage;
        private Object data;
        private Object error;

        @Override
        public String toString() {
            return "Body{" +
                    "state=" + state +
                    ", result='" + result + '\'' +
                    ", massage='" + massage + '\'' +
                    ", data=" + data +
                    ", error=" + error +
                    '}';
        }
    }
    @Getter
    @Builder
    private static class ListBody {

        private int state;
        private String result;
        private String massage;
        private List<Lab> data;
        private Object error;


        @Override
        public String toString() {
            return "ListBody{" +
                    "state=" + state +
                    ", result='" + result + '\'' +
                    ", massage='" + massage + '\'' +
                    ", data=" + data +
                    ", error=" + error +
                    '}';
        }
    }

    public ResponseEntity<?> success(List<Lab> data, String msg, HttpStatus status) {
        System.out.println(data);
        List<LabResponseDto.Lab> labs = new ArrayList<>();
        for ( Lab l :data){
            LabResponseDto.Lab lab= new LabResponseDto.Lab();
            lab.setLabId(l.getId());
            lab.setNotice(l.getNotice());
            lab.setState(l.getState());
            lab.setLocation(l.getLocation());
            labs.add(lab);
        }
        Body body = Body.builder()
                .state(status.value())
                .data(labs)
                .result("success")
                .massage(msg)
                .error(Collections.emptyList())
                .build();

        return ResponseEntity.ok(body);
    }

   public ResponseEntity<?> success(Object data, String msg, HttpStatus status) {

        Body body = Body.builder()
                .state(status.value())
                .data(data)
                .result("success")
                .massage(msg)
                .error(Collections.emptyList())
                .build();
        return ResponseEntity.ok(body);
    }



    public ResponseEntity<?> success(Object data, Member member, String msg, HttpStatus status) {
        Body body = Body.builder()
                .state(status.value())
                .data(data)
                .data(member)
                .result("success")
                .massage(msg)
                .error(Collections.emptyList())
                .build();
        return ResponseEntity.ok(body);
    }

    /**
     * <p> 메세지만 가진 성공 응답을 반환한다.</p>
     * <pre>
     *     {
     *         "state" : 200,
     *         "result" : success,
     *         "message" : message,
     *         "data" : [],
     *         "error" : []
     *     }
     * </pre>
     *
     * @param msg 응답 바디 message 필드에 포함될 정보
     * @return 응답 객체
     */
    public ResponseEntity<?> success(String msg) {
        return success(Collections.emptyList(), msg, HttpStatus.OK);
    }

    /**
     * <p> 데이터만 가진 성공 응답을 반환한다.</p>
     * <pre>
     *     {
     *         "state" : 200,
     *         "result" : success,
     *         "message" : null,
     *         "data" : [{data1}, {data2}...],
     *         "error" : []
     *     }
     * </pre>
     *
     * @param data 응답 바디 data 필드에 포함될 정보
     * @return 응답 객체
     */
    public ResponseEntity<?> success(Object data) {
        return success(data, null, HttpStatus.OK);
    }

    /**
     * <p> 성공 응답만 반환한다. </p>
     * <pre>
     *     {
     *         "state" : 200,
     *         "result" : success,
     *         "message" : null,
     *         "data" : [],
     *         "error" : []
     *     }
     * </pre>
     *
     * @return 응답 객체
     */
    public ResponseEntity<?> success() {
        return success(Collections.emptyList(), null, HttpStatus.OK);
    }

    public ResponseEntity<?> fail(Object data, String msg, HttpStatus status) {
        Body body = Body.builder()
                .state(status.value())
                .data(data)
                .result("fail")
                .massage(msg)
                .error(Collections.emptyList())
                .build();
        return ResponseEntity.ok(body);
    }

    /**
     * <p> 메세지를 가진 실패 응답을 반환한다. </p>
     * <pre>
     *     {
     *         "state" : HttpStatus Code,
     *         "result" : fail,
     *         "message" : message,
     *         "data" : [],
     *         "error" : [{error1}, {error2}...]
     *     }
     * </pre>
     *
     * @param msg 응답 바디 message 필드에 포함될 정보
     * @param status 응답 바디 status 필드에 포함될 응답 상태 코드
     * @return 응답 객체
     */
    public ResponseEntity<?> fail(String msg, HttpStatus status) {
        return fail(Collections.emptyList(), msg, status);
    }

    public ResponseEntity<?> invalidFields(LinkedList<LinkedHashMap<String, String>> errors) {
        Body body = Body.builder()
                .state(HttpStatus.BAD_REQUEST.value())
                .data(Collections.emptyList())
                .result("fail")
                .massage("")
                .error(errors)
                .build();
        return ResponseEntity.ok(body);
    }
}