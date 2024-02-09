import React, { useEffect, useState } from "react";
import { Form, Button, Card } from 'react-bootstrap';
import OtpInput from "react-otp-input";
import "./otpForm.css";
function OtpForm() {
    const [isSignedUp, setIsSignedUp] = useState(true);
    const [otpError, setOtpError] = useState(false);
    const [passwordResetPage, setPasswordResetPage] = useState(false);

    const [otpValue, setOtpValue] = useState("");
    const [timer, setTimer] = useState(60);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const isOtpComplete = otpValue?.length === 6;

    // https://watspi-dev-aa7972875395.herokuapp.com/api/users/verification

    useEffect(() => {
        let interval;

        if (isTimerRunning) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isTimerRunning]);

    useEffect(() => {
        if (timer <= 0) {
            setIsTimerRunning(false);
        }
    }, [timer]);

    const handleResendClick = () => {
        setTimer(60); // Reset the timer
        setIsTimerRunning(true);
    };

    return (
        <>
            {isSignedUp && (
                <div className="main-OtpForm">
                    <Card style={{ maxWidth: "450px", margin: "0 auto", width: "100%", padding: "16px 0" }}>
                        {/* <a href="/"> */}
                            <button className="back-arrow-otp">
                                <i className="fa fa-arrow-left" />
                            </button>
                        {/* </a> */}
                        <h4 className="otp-head">Enter OTP</h4>
                        <div
                            className="otp-parent-div"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                gap: "16px"
                            }}
                        >
                            <p className="txt-center-white">Please enter OTP sent on Your Account</p>
                            <OtpInput
                                value={otpValue}
                                onChange={setOtpValue}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} />}
                                inputStyle={{
                                    width: "40px",
                                    height: "40px",
                                    fontSize: "24px",
                                    textAlign: "center",
                                    border: "2px solid #ccc",
                                    borderRadius: "4px",
                                    margin: "0 4px",
                                    padding: "8px",
                                    outline: "none",
                                    borderColor: "#53585e",
                                }}
                                className="mob-style"
                            />
                            <div className="md:text-sm text-[0.7rem] text-center">
                                Didn't recieve code?{" "}
                                <span
                                    className={`font-bold ${isTimerRunning
                                        ? "timer-color"
                                        : "timer-sendNow-color"
                                        }`}
                                    onClick={isTimerRunning ? undefined : handleResendClick}
                                >
                                    {isTimerRunning ? `Resend in ${timer}s` : "Resend now"}
                                </span>

                            </div>
                            <div className="  w-full flex justify-center">
                                <button
                                    disabled={!isOtpComplete}
                                    // onClick={() => {
                                    //     getStatusTransaction();
                                    // }}
                                    className={`${isOtpComplete
                                        ? "btn-Verify"
                                        : "opacity-50 bg-slate-600 text-white cursor-not-allowed inactive-verify"
                                        } p-2 md:text-xl text-base flex items-center justify-center font-semibold rounded-md 2xl:w-[426px] md:w-[360px] w-full`}
                                >
                                    VERIFY
                                </button>
                            </div>
                        </div >
                        {otpError && (
                            <p
                                className="text-center"
                                style={{ color: "red", marginTop: "1rem" }}
                            >
                                Entered wrong code, please enter the code sent on email
                            </p>
                        )}
                    </Card >
                </div>
            )
            }
        </>
    );
}

export default OtpForm;
