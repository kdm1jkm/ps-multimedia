import React from "react";
import HomePresenter from "./HomePresenter";
import { api } from "../../api";

export default class extends React.Component {
  state = {
    studentList: null,
    loading: true,
    error: null,
    isAvailable: null,
  };

  async componentDidMount() {
    try {
      const {
        data: { studentList, isAvailable },
      } = await api.currentState();
      this.setState({ studentList, isAvailable });
    } catch {
      this.setState({ error: "Error. Please contact the administrator." });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { studentList, loading, error, isAvailable } = this.state;
    return (
      <HomePresenter
        studentList={studentList}
        loading={loading}
        error={error}
        isAvailable={isAvailable}
      />
    );
  }
}
