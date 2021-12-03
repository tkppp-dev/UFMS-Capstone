package sj.sjesl.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sj.sjesl.dto.lab.LabRequestDto;
import sj.sjesl.dto.lab.LabResponseDto;
import sj.sjesl.dto.lab.LabSaveRequestDto;
import sj.sjesl.entity.Lab;
import sj.sjesl.entity.Member;

import sj.sjesl.payload.Response;
import sj.sjesl.repository.FacilityRepository;
import sj.sjesl.repository.LabRepository;
import sj.sjesl.repository.MemberRepository;
import sj.sjesl.repository.ReservationRepository;
import sj.sjesl.util.FTPUploader2;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LabService {
    private final LabRepository labRepository;
    private final MemberRepository memberRepository;
    private final Response response;
    private final ReservationRepository reservationRepository ;
    private final FacilityRepository facilityRepository;


    @Transactional
    public ResponseEntity<?> save(LabSaveRequestDto requestDto) {
        Member member = memberRepository.findByMemberId(requestDto.getMemberId());
        if (member==null) return response.fail("해당하는 유저가 존재하지 않습니다.", HttpStatus.BAD_REQUEST);

        Lab lab = Lab.builder()
                .member(member)
                .location(requestDto.getLocation())
                .build();

        labRepository.save(lab);
        return response.success(requestDto,"연구실 추가에 성공하였습니다.",HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> noticeUpdate(Long id, LabRequestDto.noticeLab notice) throws Exception {
        Optional<Lab> lab = labRepository.findById(id);
        if (lab==null) return response.fail("해당하는 연구실이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);

        Lab findLab= lab.get();
        findLab.noticeUpdate(notice.getNotice());
        LabResponseDto.noticeLab build = LabResponseDto.noticeLab.builder().
                notice(notice.getNotice())
                .memberId(id).build();
        FTPUploader2 ftpUploader2 = new FTPUploader2(reservationRepository,  facilityRepository,  labRepository,  memberRepository);
        ftpUploader2.ESL_FTP();

        return response.success(build,"연구실 공지사항 변경이 완료되었습니다.",HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> stateUpdate(Long id, LabRequestDto.stateLab state) throws Exception {
        Optional<Lab> lab = labRepository.findById(id);
        if (lab==null) return response.fail("해당하는 연구실이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);

        Lab findLab= lab.get();
        findLab.stateUpdate(state.getState());
        LabResponseDto.StateLab build = LabResponseDto.StateLab.builder()
                .state(state.getState())
                .memberId(id).build();
        FTPUploader2 ftpUploader2 = new FTPUploader2(reservationRepository,  facilityRepository,  labRepository,  memberRepository);
        ftpUploader2.ESL_FTP();

        return response.success(build,"연구실 상태 변경이 완료되었습니다.",HttpStatus.OK);
    }
//
//    public InquiryResponseDto findById(Long id) {
//        ReservationInquiry entity = inquiryRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("해당 문의글이 없습니다. id=" + id));
//
//        return new InquiryResponseDto(entity);
//    }
//
//    @Transactional(readOnly = true)
//    public List<InquiryListResponseDto> findAllDesc() {
//        return inquiryRepository.findAllDesc().stream()
//                .map(InquiryListResponseDto::new)
//                .collect(Collectors.toList());
//    }
//
//    @Transactional
//    public void delete(Long id){
//        ReservationInquiry inquiry = inquiryRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("해당 문의글이 없습니다. id=" + id));
//
//        inquiryRepository.delete(inquiry);
//    }
}
